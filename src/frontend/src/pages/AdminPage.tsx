import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  LogIn,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ContactSubmission, Service } from "../backend";
import { seedServices } from "../data/seedServices";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type Tab = "services" | "contacts";

interface ServiceFormData {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  order: string;
}

const emptyForm: ServiceFormData = {
  id: "",
  title: "",
  shortDescription: "",
  description: "",
  iconName: "Heart",
  order: "1",
};

export default function AdminPage() {
  const { actor } = useActor();
  const { identity, login, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("services");
  const [services, setServices] = useState<Service[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [editingService, setEditingService] = useState<ServiceFormData | null>(
    null,
  );
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Admin | EmpowerAbility";
  }, []);

  useEffect(() => {
    if (!actor) return;
    actor
      .isCallerAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor]);

  useEffect(() => {
    if (!actor || !isAdmin) return;
    actor
      .getAllServices()
      .then((data) => {
        setServices([...data].sort((a, b) => Number(a.order - b.order)));
      })
      .catch(console.error);
    actor
      .getAllContacts()
      .then((data) => {
        setContacts(
          [...data].sort((a, b) => Number(b.timestamp - a.timestamp)),
        );
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actor, isAdmin]);

  const loadServices = async () => {
    if (!actor) return;
    const data = await actor.getAllServices();
    setServices([...data].sort((a, b) => Number(a.order - b.order)));
  };

  const loadContacts = async () => {
    if (!actor) return;
    const data = await actor.getAllContacts();
    setContacts([...data].sort((a, b) => Number(b.timestamp - a.timestamp)));
  };

  const handleSaveService = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      const svc: Service = {
        id: formData.id || crypto.randomUUID(),
        title: formData.title,
        shortDescription: formData.shortDescription,
        description: formData.description,
        iconName: formData.iconName,
        order: BigInt(Number.parseInt(formData.order) || 1),
      };
      if (editingService) {
        await actor.updateService(svc);
        setMessage("Service updated.");
      } else {
        await actor.addService(svc);
        setMessage("Service added.");
      }
      setEditingService(null);
      setIsAdding(false);
      setFormData(emptyForm);
      await loadServices();
    } catch {
      setMessage("Error saving service.");
    }
    setSaving(false);
  };

  const handleDeleteService = async (id: string) => {
    if (!actor || !confirm("Delete this service?")) return;
    await actor.deleteService(id);
    await loadServices();
    setMessage("Service deleted.");
  };

  const handleDeleteContact = async (id: string) => {
    if (!actor || !confirm("Delete this submission?")) return;
    await actor.deleteContact(id);
    await loadContacts();
  };

  const handleEditService = (s: Service) => {
    setEditingService({
      id: s.id,
      title: s.title,
      shortDescription: s.shortDescription,
      description: s.description,
      iconName: s.iconName,
      order: String(s.order),
    });
    setFormData({
      id: s.id,
      title: s.title,
      shortDescription: s.shortDescription,
      description: s.description,
      iconName: s.iconName,
      order: String(s.order),
    });
    setIsAdding(false);
  };

  const handleSeedServices = async () => {
    if (!actor) return;
    setSaving(true);
    await Promise.all(seedServices.map((s) => actor.addService(s)));
    await loadServices();
    setSaving(false);
    setMessage("Seed services added.");
  };

  if (!identity) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#1F2D33" }}>
          Admin Login
        </h1>
        <p className="mb-8" style={{ color: "#5E6B73" }}>
          Sign in with Internet Identity to access the admin dashboard.
        </p>
        <button
          type="button"
          onClick={login}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#0D3B46" }}
        >
          <LogIn className="w-5 h-5" aria-hidden="true" /> Sign In
        </button>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#1F2D33" }}>
          Access Denied
        </h1>
        <p className="mb-8" style={{ color: "#5E6B73" }}>
          Your account does not have admin access.
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="text-blue-600 underline text-sm"
        >
          Return home
        </button>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">Loading...</div>
    );
  }

  const showForm = isAdding || !!editingService;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold" style={{ color: "#1F2D33" }}>
          Admin Dashboard
        </h1>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors hover:bg-slate-50"
          style={{ borderColor: "#0D3B46", color: "#0D3B46" }}
        >
          <LogOut className="w-4 h-4" aria-hidden="true" /> Sign Out
        </button>
      </div>

      {message && (
        <output className="block mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
          {message}
        </output>
      )}

      <div className="flex gap-2 mb-8 border-b border-slate-200">
        {(["services", "contacts"] as Tab[]).map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 font-semibold text-sm capitalize border-b-2 transition-colors ${
              tab === t
                ? "border-current"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
            style={
              tab === t ? { borderColor: "#0D3B46", color: "#0D3B46" } : {}
            }
            aria-current={tab === t ? ("page" as const) : undefined}
          >
            {t === "contacts" ? "Contact Submissions" : "Services"}
          </button>
        ))}
      </div>

      {tab === "services" && (
        <section aria-label="Manage services">
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsAdding(true);
                setEditingService(null);
                setFormData(emptyForm);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0D3B46" }}
            >
              <Plus className="w-4 h-4" aria-hidden="true" /> Add Service
            </button>
            {services.length === 0 && (
              <button
                type="button"
                onClick={handleSeedServices}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors hover:bg-slate-50 disabled:opacity-60"
                style={{ borderColor: "#0D3B46", color: "#0D3B46" }}
              >
                Load Sample Services
              </button>
            )}
          </div>

          {showForm && (
            <div className="mb-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h2
                className="font-bold text-lg mb-5"
                style={{ color: "#1F2D33" }}
              >
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="s-title"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#1F2D33" }}
                  >
                    Title *
                  </label>
                  <input
                    id="s-title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, title: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="s-icon"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#1F2D33" }}
                  >
                    Icon Name
                  </label>
                  <input
                    id="s-icon"
                    value={formData.iconName}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, iconName: e.target.value }))
                    }
                    placeholder="Heart, Users, Home, Activity"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="s-short"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#1F2D33" }}
                  >
                    Short Description *
                  </label>
                  <input
                    id="s-short"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        shortDescription: e.target.value,
                      }))
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="s-desc"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#1F2D33" }}
                  >
                    Full Description *
                  </label>
                  <textarea
                    id="s-desc"
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-y"
                  />
                </div>
                <div>
                  <label
                    htmlFor="s-order"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#1F2D33" }}
                  >
                    Display Order
                  </label>
                  <input
                    id="s-order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, order: e.target.value }))
                    }
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleSaveService}
                  disabled={saving || !formData.title || !formData.description}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#0D3B46" }}
                >
                  {saving ? "Saving..." : "Save Service"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingService(null);
                  }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold border border-slate-300 hover:bg-slate-50"
                  style={{ color: "#5E6B73" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {services.length === 0 && !showForm && (
            <p className="text-center py-12" style={{ color: "#5E6B73" }}>
              No services yet. Add one above or load sample services.
            </p>
          )}
          <div className="space-y-3">
            {services.map((s) => (
              <div
                key={s.id}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="flex-1">
                  <p className="font-bold" style={{ color: "#1F2D33" }}>
                    {s.title}
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#5E6B73" }}>
                    {s.shortDescription}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditService(s)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label={`Edit ${s.title}`}
                    style={{ color: "#2F7DBE" }}
                  >
                    <Edit2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteService(s.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label={`Delete ${s.title}`}
                    style={{ color: "#e53e3e" }}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "contacts" && (
        <section aria-label="Contact submissions">
          {contacts.length === 0 && (
            <p className="text-center py-12" style={{ color: "#5E6B73" }}>
              No contact submissions yet.
            </p>
          )}
          <div className="space-y-3">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold" style={{ color: "#1F2D33" }}>
                      {c.name}
                    </p>
                    <p className="text-sm" style={{ color: "#5E6B73" }}>
                      {c.email}
                      {c.phone ? ` · ${c.phone}` : ""}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#5E6B73" }}>
                      {new Date(Number(c.timestamp)).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteContact(c.id)}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    aria-label={`Delete submission from ${c.name}`}
                    style={{ color: "#e53e3e" }}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "#1F2D33" }}
                >
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
