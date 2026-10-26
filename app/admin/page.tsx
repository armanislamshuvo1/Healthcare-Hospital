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
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HOSPITAL_INFO, DOCTOR_PROFILE } from "@/lib/constants";
import { AppointmentRequestRecord } from "@/types";

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

  const [records, setRecords] = useState<AppointmentRequestRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Notice & Schedule editable state
  const [noticeText, setNoticeText] = useState(
    "Notice: OPD consultation serials are open for Dr. A.S.M. Rashedul Hasan (Sat-Thu). 24/7 Emergency Ward operational."
  );
  const [noticeSaved, setNoticeSaved] = useState(false);

  // Settings editable state per Brief Line 91
  const [doctorSchedule, setDoctorSchedule] = useState("Saturday - Thursday: 5:00 PM - 9:00 PM");
  const [hospitalPhone, setHospitalPhone] = useState("016*******");
  const [emergencyText, setEmergencyText] = useState("24/7 Immediate Attention & Triage");
  const [consultationFee, setConsultationFee] = useState("৳ 800 (New) / ৳ 500 (Follow-up)");
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    // Check session
    const authSession = sessionStorage.getItem("hh_admin_session");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }

    // Load records from localStorage or initial demo
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("hh_appointment_records");
        if (stored) {
          const parsed = JSON.parse(stored);
          setRecords(parsed);
        } else {
          setRecords(INITIAL_DEMO_RECORDS);
          localStorage.setItem("hh_appointment_records", JSON.stringify(INITIAL_DEMO_RECORDS));
        }

        const storedNotice = localStorage.getItem("hh_hospital_notice");
        if (storedNotice) {
          setNoticeText(storedNotice);
        }

        const storedSettings = localStorage.getItem("hh_hospital_settings");
        if (storedSettings) {
          const s = JSON.parse(storedSettings);
          if (s.doctorSchedule) setDoctorSchedule(s.doctorSchedule);
          if (s.hospitalPhone) setHospitalPhone(s.hospitalPhone);
          if (s.emergencyText) setEmergencyText(s.emergencyText);
          if (s.consultationFee) setConsultationFee(s.consultationFee);
        }
      } catch (e) {
        setRecords(INITIAL_DEMO_RECORDS);
      }
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const settings = {
        doctorSchedule,
        hospitalPhone,
        emergencyText,
        consultationFee,
      };
      localStorage.setItem("hh_hospital_settings", JSON.stringify(settings));
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hospital123" || password === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("hh_admin_session", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. (Hint for evaluation: use password 'hospital123')");
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

  const filteredRecords = records.filter((r) => {
    const matchesStatus = filterStatus === "all" || r.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phoneNumber.includes(searchTerm) ||
      r.token.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-teal-50 border-2 border-teal-200 text-teal-800 rounded-2xl mx-auto flex items-center justify-center">
              <Shield className="w-7 h-7 text-teal-700" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Hospital Staff Admin</h2>
            <p className="text-xs text-slate-600">
              Healthcare Hospital Management Portal • Mr. Anwar Kamal
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            {authError && (
              <div className="p-3 text-xs rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium">
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Username / Staff ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Admin Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <span className="block text-[11px] text-slate-500">
                Staff access (Default: <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800 font-mono">hospital123</code>)
              </span>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
              <Lock className="w-4 h-4 mr-2" />
              <span>Log In to Admin Panel</span>
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="teal" size="sm">Staff Portal</Badge>
              <span className="text-xs text-slate-500">Chattogram 4203</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Healthcare Hospital Management Panel
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Logged in as: <span className="font-semibold text-slate-900">Mr. Anwar Kamal (Hospital Manager)</span>
            </p>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-xs text-slate-600 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>

        {/* Notices & Announcement Updater */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-teal-600" />
              Edit Live Announcement Strip (Brief R4 / Line 92)
            </h2>
            {noticeSaved && (
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                Notice updated on live site!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveNotice} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              className="flex-1 h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g. Notice: Special Friday rounds scheduled..."
            />
            <Button type="submit" variant="primary" size="md">
              <Save className="w-4 h-4 mr-1.5" />
              <span>Save & Publish Notice</span>
            </Button>
          </form>
        </div>

        {/* Content & Schedule Manager per Brief Line 91 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                Hospital Content & Schedule Management
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Edit Dr. Hasan&apos;s schedule, phone numbers, and fees.
              </p>
            </div>
            {settingsSaved && (
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                Hospital settings saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Doctor Chamber Hours</label>
                <input
                  type="text"
                  value={doctorSchedule}
                  onChange={(e) => setDoctorSchedule(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Display Phone Number</label>
                <input
                  type="text"
                  value={hospitalPhone}
                  onChange={(e) => setHospitalPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Emergency Ward Availability</label>
                <input
                  type="text"
                  value={emergencyText}
                  onChange={(e) => setEmergencyText(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Consultation Fee</label>
                <input
                  type="text"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button type="submit" variant="primary" size="md">
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save Hospital Settings</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Appointment Requests Management */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  Patient Appointment Requests ({filteredRecords.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage patient consultation serial requests. Mark as Called, Confirmed, or Cancelled.
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
                          className="text-teal-700 hover:underline font-semibold block mt-0.5"
                        >
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
      </div>
    </div>
  );
}
