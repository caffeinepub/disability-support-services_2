import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextServiceOrder = 1;

  type Service = {
    id : Text;
    title : Text;
    description : Text;
    shortDescription : Text;
    iconName : Text;
    photoUrl : ?Storage.ExternalBlob;
    videoUrl : ?Storage.ExternalBlob;
    order : Nat;
  };

  module Service {
    public func compare(service1 : Service, service2 : Service) : {
      #less;
      #equal;
      #greater;
    } {
      Nat.compare(service1.order, service2.order);
    };
  };

  type ContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    phone : ?Text;
    message : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  let services = Map.empty<Text, Service>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Helper function to get a service (throws error if not found)
  func getServiceInternal(id : Text) : Service {
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) { service };
    };
  };

  // Function to get all services sorted
  func getAllServicesInternal() : [Service] {
    services.values().toArray().sort();
  };

  func reorderServicesInternal(orderedServiceIds : [Text]) {
    for (i in Nat.range(0, orderedServiceIds.size())) {
      let id = orderedServiceIds[i];
      switch (services.get(id)) {
        case (?service) {
          let updatedService : Service = {
            service with
            order = i + 1;
          };
          services.add(id, updatedService);
        };
        case (null) {};
      };
    };
  };

  // User Profiles
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func reorderServices(orderedServiceIds : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder services");
    };
    reorderServicesInternal(orderedServiceIds);
  };

  // Services - Public read, admin write only
  public query func getAllServices() : async [Service] {
    getAllServicesInternal();
  };

  public query func getService(id : Text) : async Service {
    getServiceInternal(id);
  };

  public shared ({ caller }) func addService(service : Service) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };

    // Ensure service doesn't already exist
    if (services.containsKey(service.id)) {
      Runtime.trap("Service with this ID already exists");
    };

    let newService : Service = {
      service with
      order = nextServiceOrder;
    };
    services.add(service.id, newService);
    nextServiceOrder += 1;
  };

  public shared ({ caller }) func updateService(service : Service) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };

    if (not services.containsKey(service.id)) {
      Runtime.trap("Service not found");
    };
    services.add(service.id, service);
  };

  public shared ({ caller }) func deleteService(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };

    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    services.remove(id);
  };

  // Contact Submissions - Public submit, admin list/delete
  public shared ({ caller }) func submitContact(contact : ContactSubmission) : async () {
    if (contact.name.size() == 0) {
      Runtime.trap("Name is required");
    };
    if (contact.email.size() == 0) {
      Runtime.trap("Email is required");
    };
    let newContact = {
      contact with
      timestamp = Time.now();
    };
    contactSubmissions.add(contact.id, newContact);
  };

  public shared ({ caller }) func deleteContact(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete contact submissions");
    };

    if (not contactSubmissions.containsKey(id)) {
      Runtime.trap("Contact submission not found");
    };
    contactSubmissions.remove(id);
  };

  public query ({ caller }) func getAllContacts() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };
};
