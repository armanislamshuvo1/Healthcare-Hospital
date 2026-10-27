"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  UserCheck,
  CheckCircle,
  XCircle,
  PhoneCall,
  Search,
  RefreshCw,
  LogOut,
  Save,
  Megaphone,
  Calendar,
  Clock,
  Shield,
  Filter,
  BookOpen,
  Sliders,
  FileText,
  AlertTriangle,
  Plus,
  Trash2,
  CheckCircle2,
  Info,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO, DOCTOR_PROFILE, HERO_SLIDES } from "@/lib/constants";
import { AppointmentRequestRecord, ScheduleSlot, HeroSlide } from "@/types";

const INITIAL_DEMO_RECORDS: AppointmentRequestRecord[] = [
  {
    id: "req-101",
    token: "HH-APT-2610-1842",
    patientName: "Kamal Hossain",
    phoneNumber: "01712345678",
    email: "kamal@example.com",
    age: "48",
    gender: "male",
    appointmentDate: "2026-10-28",
    reason: "Uncontrolled blood pressure and chronic fatigue evaluation",
    doctorName: "Dr. A.S.M. Rashedul Hasan",
    status: "Called",
    submittedAt: "Oct 26, 04:30 PM",
  },
  {
    id: "req-102",
    token: "HH-APT-2610-3921",
    patientName: "Nasreen Akter",
    phoneNumber: "01819876543",
    email: "nasreen@example.com",
    age: "36",
    gender: "female",
    appointmentDate: "2026-10-29",
    reason: "Persistent fever and joint pain checkup",
    doctorName: "Dr. A.S.M. Rashedul Hasan",
    status: "Confirmed",
    submittedAt: "Oct 26, 02:15 PM",
  },
  {
    id: "req-103",
    token: "HH-APT-2610-7714",
    patientName: "Abdur Rahim",
    phoneNumber: "01600000000",
    age: "55",
    gender: "male",
    appointmentDate: "2026-10-27",
    reason: "Diabetes follow-up and medicine prescription review",
    doctorName: "Dr. A.S.M. Rashedul Hasan",
    status: "Cancelled",
    submittedAt: "Oct 25, 06:40 PM",
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("anwar.kamal");
  const [authError, setAuthError] = useState("");

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<"appointments" | "schedule" | "hero" | "notices" | "guide">("appointments");

  // Appointment Records
  const [records, setRecords] = useState<AppointmentRequestRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Notice Strip state
  const [noticeText, setNoticeText] = useState(
    "Notice: OPD consultation serials are open for Dr. A.S.M. Rashedul Hasan (Sat-Thu). 24/7 Emergency Ward operational."
  );
  const [noticeSaved, setNoticeSaved] = useState(false);

  // Doctor Schedule state
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>(DOCTOR_PROFILE.schedule);
  const [consultationFee, setConsultationFee] = useState(DOCTOR_PROFILE.consultationFee);
  const [scheduleSaved, setScheduleSaved] = useState(false);

  // Hero Slides state
  const [slides, setSlides] = useState<HeroSlide[]>(HERO_SLIDES);
  const [slidesSaved, setSlidesSaved] = useState(false);

  // Hospital Contact & General Settings
  const [hospitalPhone, setHospitalPhone] = useState(HOSPITAL_INFO.displayPhone);
  const [emergencyText, setEmergencyText] = useState("24/7 Immediate Attention & Triage");
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    // Check session
    const authSession = sessionStorage.getItem("hh_admin_session");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }

    if (typeof window !== "undefined") {
      try {
        // Appointments
        const storedRecords = localStorage.getItem("hh_appointment_records");
        if (storedRecords) {
          setRecords(JSON.parse(storedRecords));
        } else {
          setRecords(INITIAL_DEMO_RECORDS);
          localStorage.setItem("hh_appointment_records", JSON.stringify(INITIAL_DEMO_RECORDS));
        }

        // Notice
        const storedNotice = localStorage.getItem("hh_hospital_notice");
        if (storedNotice) {
          setNoticeText(storedNotice);
        }

        // Schedule Slots
        const storedSchedule = localStorage.getItem("hh_doctor_schedule");
        if (storedSchedule) {
          const parsed = JSON.parse(storedSchedule);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setScheduleSlots(parsed);
          }
        }

        // Hero Slides
        const storedSlides = localStorage.getItem("hh_hero_slides");
        if (storedSlides) {
          const parsed = JSON.parse(storedSlides);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSlides(parsed);
          }
        }

        // Hospital settings
        const storedSettings = localStorage.getItem("hh_hospital_settings");
        if (storedSettings) {
          const s = JSON.parse(storedSettings);
          if (s.hospitalPhone) setHospitalPhone(s.hospitalPhone);
          if (s.emergencyText) setEmergencyText(s.emergencyText);
          if (s.consultationFee) setConsultationFee(s.consultationFee);
        }
      } catch (e) {
        console.error("Initialization error:", e);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hospital123" || password === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("hh_admin_session", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. (Demo hint: use password 'hospital123')");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("hh_admin_session");
  };

  const updateStatus = (id: string, newStatus: "Called" | "Confirmed" | "Cancelled") => {
    const updated = records.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    setRecords(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("hh_appointment_records", JSON.stringify(updated));
    }
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("hh_hospital_notice", noticeText);
      setNoticeSaved(true);
      setTimeout(() => setNoticeSaved(false), 3000);
    }
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("hh_doctor_schedule", JSON.stringify(scheduleSlots));
      const existingSettings = JSON.parse(localStorage.getItem("hh_hospital_settings") || "{}");
      localStorage.setItem(
        "hh_hospital_settings",
        JSON.stringify({ ...existingSettings, consultationFee })
      );
      setScheduleSaved(true);
      setTimeout(() => setScheduleSaved(false), 3000);
    }
  };

  const handleSaveSlides = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("hh_hero_slides", JSON.stringify(slides));
      setSlidesSaved(true);
      setTimeout(() => setSlidesSaved(false), 3000);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const existingSettings = JSON.parse(localStorage.getItem("hh_hospital_settings") || "{}");
      const updated = {
        ...existingSettings,
        hospitalPhone,
        emergencyText,
        consultationFee,
      };
      localStorage.setItem("hh_hospital_settings", JSON.stringify(updated));
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    }
  };

  const handleAddScheduleSlot = () => {
    setScheduleSlots([
      ...scheduleSlots,
      { days: "Friday", time: "6:00 PM - 8:00 PM", room: "Chamber 201, OPD Block" },
    ]);
  };

  const handleRemoveScheduleSlot = (index: number) => {
    if (scheduleSlots.length <= 1) return;
    setScheduleSlots(scheduleSlots.filter((_, i) => i !== index));
  };

  const handleUpdateScheduleSlot = (index: number, field: keyof ScheduleSlot, val: string) => {
    const updated = [...scheduleSlots];
    updated[index] = { ...updated[index], [field]: val };
    setScheduleSlots(updated);
  };

  const handleUpdateSlide = (index: number, field: keyof HeroSlide, val: string | boolean) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: val };
    setSlides(updated);
  };

  const filteredRecords = records.filter((r) => {
    const matchesStatus = filterStatus === "all" || r.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phoneNumber.includes(searchTerm) ||
      r.token.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-teal-50 border-2 border-teal-200 text-teal-800 rounded-2xl mx-auto flex items-center justify-center">
              <Shield className="w-7 h-7 text-teal-700" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Healthcare Hospital</h1>
            <p className="text-xs text-slate-500">
              Staff Portal • In-Charge: Mr. Anwar Kamal (Hospital Manager)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 text-xs rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium">
                {authError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Staff Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="anwar.kamal"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Access Key / Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••••••"
                required
              />
              <p className="text-[11px] text-slate-400">
                Staff access key (Demo: <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800 font-mono">hospital123</code>)
              </p>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
              <Lock className="w-4 h-4 mr-1.5" />
              <span>Sign In to Dashboard</span>
            </Button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400">
              Protected staff portal for serial scheduling and website management.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="teal" size="sm">
                Administrative Workspace
              </Badge>
              <span className="text-xs text-slate-400">v1.2 Live</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Hospital Operations & Staff Desk
            </h1>
            <p className="text-xs text-slate-500">
              Logged in as: <strong className="text-slate-700">Mr. Anwar Kamal</strong> (Hospital Manager)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/"
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              <span>View Public Site</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "appointments"
                ? "bg-teal-700 text-white shadow-xs font-bold"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointment Requests ({records.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "schedule"
                ? "bg-teal-700 text-white shadow-xs font-bold"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Doctor Schedule & Fees</span>
          </button>

          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "hero"
                ? "bg-teal-700 text-white shadow-xs font-bold"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Hero Slider Editor</span>
          </button>

          <button
            onClick={() => setActiveTab("notices")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "notices"
                ? "bg-teal-700 text-white shadow-xs font-bold"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Notice Strip & Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === "guide"
                ? "bg-teal-700 text-white shadow-xs font-bold"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Staff How-To Guide</span>
          </button>
        </div>

        {/* TAB 1: APPOINTMENT REQUESTS */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    Patient Appointment Requests ({filteredRecords.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review patient consultation requests. Call to confirm attendance and mark status.
                  </p>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  {["all", "called", "confirmed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                        filterStatus === st
                          ? "bg-white text-teal-900 shadow-xs font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by patient name, phone number (01X...), or token ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Token & Date</th>
                    <th className="py-3 px-4">Patient Info</th>
                    <th className="py-3 px-4">Doctor & Reason</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-500">
                        No appointment requests found matching filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-4 align-top">
                          <span className="font-mono font-bold text-teal-800 text-sm block">
                            {req.token}
                          </span>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            Req Date: {req.appointmentDate}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Submitted: {req.submittedAt}
                          </span>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <span className="font-bold text-slate-900 block text-sm">
                            {req.patientName}
                          </span>
                          <a
                            href={`tel:${req.phoneNumber}`}
                            className="text-teal-700 hover:underline font-semibold block mt-0.5 flex items-center gap-1"
                          >
                            <PhoneCall className="w-3 h-3 inline" />
                            {req.phoneNumber}
                          </a>
                          <span className="text-[11px] text-slate-500 block capitalize">
                            {req.age} yrs • {req.gender}
                          </span>
                          {req.email && (
                            <span className="text-[11px] text-slate-400 block">{req.email}</span>
                          )}
                        </td>

                        <td className="py-4 px-4 align-top max-w-xs">
                          <span className="font-semibold text-slate-800 block">
                            {req.doctorName}
                          </span>
                          <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                            {req.reason}
                          </p>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              req.status === "Confirmed"
                                ? "bg-teal-100 text-teal-800"
                                : req.status === "Called"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 align-top text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => updateStatus(req.id, "Called")}
                            title="Mark as Called"
                            className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                              req.status === "Called"
                                ? "bg-amber-600 text-white border-amber-600"
                                : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                            }`}
                          >
                            Called
                          </button>
                          <button
                            onClick={() => updateStatus(req.id, "Confirmed")}
                            title="Mark as Confirmed"
                            className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                              req.status === "Confirmed"
                                ? "bg-teal-600 text-white border-teal-600"
                                : "bg-white text-teal-700 border-teal-300 hover:bg-teal-50"
                            }`}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(req.id, "Cancelled")}
                            title="Mark as Cancelled"
                            className={`px-2.5 py-1 rounded text-[11px] font-semibold border ${
                              req.status === "Cancelled"
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-white text-red-700 border-red-300 hover:bg-red-50"
                            }`}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DOCTOR SCHEDULE & FEES */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  Dr. A.S.M. Rashedul Hasan — Consultation Schedule Manager
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update consultation days, timings, and chamber fees without editing code. Changes reflect immediately on <code className="text-teal-700 font-mono">/doctor</code> and Home spotlight.
                </p>
              </div>

              {scheduleSaved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Schedule published live!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-6">
              {/* Schedule Slots Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    OPD Consultation Slots ({scheduleSlots.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddScheduleSlot}
                    className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 font-semibold px-2 py-1 rounded border border-teal-200 hover:bg-teal-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Schedule Slot</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {scheduleSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                    >
                      <div className="md:col-span-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-600">Days / Frequency</span>
                        <input
                          type="text"
                          value={slot.days}
                          onChange={(e) => handleUpdateScheduleSlot(index, "days", e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="e.g. Saturday - Wednesday"
                          required
                        />
                      </div>

                      <div className="md:col-span-4 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-600">Hours / Time</span>
                        <input
                          type="text"
                          value={slot.time}
                          onChange={(e) => handleUpdateScheduleSlot(index, "time", e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="e.g. 5:00 PM - 9:00 PM"
                          required
                        />
                      </div>

                      <div className="md:col-span-3 space-y-1">
                        <span className="text-[11px] font-semibold text-slate-600">Chamber Room</span>
                        <input
                          type="text"
                          value={slot.room}
                          onChange={(e) => handleUpdateScheduleSlot(index, "room", e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="e.g. Chamber 201, OPD Block"
                          required
                        />
                      </div>

                      <div className="md:col-span-1 flex justify-end md:justify-center pt-2 md:pt-4">
                        <button
                          type="button"
                          onClick={() => handleRemoveScheduleSlot(index)}
                          disabled={scheduleSlots.length <= 1}
                          title="Remove Slot"
                          className="p-2 text-slate-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Fee */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Official Consultation Fee Structure
                </label>
                <input
                  type="text"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="৳ 800 (New) / ৳ 500 (Follow-up within 14 days)"
                  required
                />
                <span className="text-[11px] text-slate-500">
                  Displayed on the Doctor profile, booking instructions, and home page spotlight.
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md">
                  <Save className="w-4 h-4 mr-1.5" />
                  <span>Save & Publish Doctor Schedule</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: HERO SLIDER EDITOR */}
        {activeTab === "hero" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-teal-600" />
                  Home Page Hero Slider Manager (3 Slides)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update headlines, subtext, badges, and button labels across the 3 rotating hero banners on the homepage.
                </p>
              </div>

              {slidesSaved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Hero slides saved!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSlides} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {slides.map((sl, idx) => (
                  <div
                    key={sl.id || idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-900 bg-teal-100 px-2 py-0.5 rounded">
                          Slide #{idx + 1}
                        </span>
                        {sl.isEmergencySlide && (
                          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                            Emergency Style
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Badge Label</label>
                        <input
                          type="text"
                          value={sl.badge}
                          onChange={(e) => handleUpdateSlide(idx, "badge", e.target.value)}
                          className="w-full h-8 px-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Headline</label>
                        <textarea
                          rows={2}
                          value={sl.headline}
                          onChange={(e) => handleUpdateSlide(idx, "headline", e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700">Subtext (1-2 lines)</label>
                        <textarea
                          rows={3}
                          value={sl.subtext}
                          onChange={(e) => handleUpdateSlide(idx, "subtext", e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700">Primary Button</label>
                          <input
                            type="text"
                            value={sl.primaryCtaText}
                            onChange={(e) => handleUpdateSlide(idx, "primaryCtaText", e.target.value)}
                            className="w-full h-8 px-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700">Button Link</label>
                          <input
                            type="text"
                            value={sl.primaryCtaHref}
                            onChange={(e) => handleUpdateSlide(idx, "primaryCtaHref", e.target.value)}
                            className="w-full h-8 px-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="md">
                  <Save className="w-4 h-4 mr-1.5" />
                  <span>Save All Hero Slides</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: NOTICE STRIP & GENERAL SETTINGS */}
        {activeTab === "notices" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Announcement Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-teal-600" />
                  Live Announcement Strip
                </h2>
                {noticeSaved && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Scrolling notification shown across all public pages for holiday hours or emergency updates.
              </p>

              <form onSubmit={handleSaveNotice} className="space-y-3">
                <textarea
                  rows={3}
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. Notice: OPD is closed on Eid day. Emergency Ward operates 24/7."
                />
                <Button type="submit" variant="primary" size="sm" className="text-xs">
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  <span>Update Announcement Banner</span>
                </Button>
              </form>
            </div>

            {/* General Hospital Phone & Contact Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-teal-600" />
                  Hospital Contact Information
                </h2>
                {settingsSaved && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Primary reception and emergency contacts used across tap-to-call links.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Display Phone Number</label>
                  <input
                    type="text"
                    value={hospitalPhone}
                    onChange={(e) => setHospitalPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Emergency Desk Note</label>
                  <input
                    type="text"
                    value={emergencyText}
                    onChange={(e) => setEmergencyText(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <Button type="submit" variant="primary" size="sm" className="text-xs">
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  <span>Save Contact Settings</span>
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: 1-PAGE STAFF HOW-TO GUIDE */}
        {activeTab === "guide" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Guide Header Banner */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="teal" size="sm">
                  Operational Reference Manual
                </Badge>
                <span className="text-xs text-slate-500">Hospital Administration Desk</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Healthcare Hospital — 1-Page Staff How-To Guide
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Standard operating guide for <strong>Mr. Anwar Kamal (Hospital Manager)</strong> and front desk reception staff to triage patient serials, update doctor chamber hours, edit hero banners, and broadcast hospital notices.
              </p>
            </div>

            {/* 5 Operational Steps Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    01
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Access & Account Security
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Log in at <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-teal-800 font-mono">/admin</code> using staff credentials. Keep session keys private. Always click <strong>Sign Out</strong> when leaving the reception terminal unattended.
                </p>
                <div className="pt-2 text-[11px] text-teal-800 font-medium">
                  • Default account: <code className="font-mono">anwar.kamal</code>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    02
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Triaging Patient Serials
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Go to <strong>Appointment Requests</strong>. For each online submission, tap the patient phone number to dial. After speaking with the patient, update their status:
                </p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li><strong className="text-amber-700">Called:</strong> Phone rang or message left.</li>
                  <li><strong className="text-teal-700">Confirmed:</strong> Patient confirmed serial date & arrival slot.</li>
                  <li><strong className="text-red-700">Cancelled:</strong> Patient declined or slot unavailable.</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    03
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Changing Doctor OPD Schedule
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When Dr. A.S.M. Rashedul Hasan updates consulting hours, go to <strong>Doctor Schedule & Fees</strong>:
                </p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>Edit days (e.g. Sat–Thu), timings (e.g. 5:00 PM – 9:00 PM), or room.</li>
                  <li>Add extra evening/holiday consultation slots using <strong>Add Slot</strong>.</li>
                  <li>Click <strong>Save & Publish Doctor Schedule</strong> to update the public site live.</li>
                </ul>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    04
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Editing Home Hero Banners
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Go to <strong>Hero Slider Editor</strong> to customize the 3 rotating banners:
                </p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li><strong>Slide 1:</strong> Consultant OPD highlights and direct booking CTA.</li>
                  <li><strong>Slide 2:</strong> 24/7 Emergency Ward immediate triage call button.</li>
                  <li><strong>Slide 3:</strong> General Medicine inpatient admission info.</li>
                  <li>Click <strong>Save All Hero Slides</strong> to apply changes.</li>
                </ul>
              </div>
            </div>

            {/* Emergency & Escalation Strip */}
            <div className="p-5 rounded-2xl bg-red-50/80 border border-red-200 text-xs text-red-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block text-red-950 font-bold">
                  Card 05: Acute Emergency & Clinical Escalation Protocol
                </strong>
                <p className="leading-relaxed">
                  For critically ill patients (acute chest pain, respiratory distress, trauma), direct families immediately to the <strong>24/7 Emergency Ward</strong> on the ground floor. Do not route emergencies through the OPD appointment serial queue.
                </p>
                <div className="flex flex-wrap gap-4 pt-1 font-semibold text-red-800">
                  <span>Emergency Desk: {HOSPITAL_INFO.emergencyPhone}</span>
                  <span>Managing Director: Dr. Abdul Karim</span>
                  <span>Consultant: Dr. A.S.M. Rashedul Hasan</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
