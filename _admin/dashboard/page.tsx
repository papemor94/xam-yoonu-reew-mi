"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle, 
  Search, 
  Download
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge, BadgeVariant } from "@/components/ui/Badge";

// Mock invoice data
const initialInvoices = [
  {
    id: "FAC-2026-005",
    memberName: "Fatou Diop",
    email: "fatou.diop@example.sn",
    type: "Cotisation Annuelle",
    date: "05/06/2026",
    amount: 50000,
    status: "payee" as BadgeVariant,
  },
  {
    id: "FAC-2026-004",
    memberName: "Cheikh Oumar Kane",
    email: "cheikh.kane@example.sn",
    type: "Don Exceptionnel",
    date: "02/06/2026",
    amount: 150000,
    status: "payee" as BadgeVariant,
  },
  {
    id: "FAC-2026-003",
    memberName: "Aminata Ndiaye",
    email: "ami.ndiaye@example.sn",
    type: "Cotisation Mensuelle",
    date: "28/05/2026",
    amount: 25000,
    status: "envoyee" as BadgeVariant,
  },
  {
    id: "FAC-2026-002",
    memberName: "Ibrahima Sow",
    email: "ibra.sow@example.sn",
    type: "Cotisation Annuelle",
    date: "15/05/2026",
    amount: 50000,
    status: "en retard" as BadgeVariant,
  },
  {
    id: "FAC-2026-001",
    memberName: "Moussa Thiam",
    email: "moussa.thiam@example.sn",
    type: "Don Exceptionnel",
    date: "10/05/2026",
    amount: 200000,
    status: "brouillon" as BadgeVariant,
  },
];

export default function DashboardPage() {
  const [invoices] = useState(initialInvoices);
  const [filter, setFilter] = useState<"all" | BadgeVariant>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter & Search logic
  const filteredInvoices = invoices.filter((inv) => {
    const matchesFilter = filter === "all" || inv.status === filter;
    const matchesSearch =
      inv.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner / Brand Header */}
      <div className="rounded-3xl bg-gradient-to-r from-xyrm-green-deep to-xyrm-green-primary p-6 md:p-8 text-white shadow-lg border border-xyrm-green-light/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-xyrm-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-4 h-32 w-32 rounded-full bg-xyrm-green-light/25 blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-4">
          <Badge className="bg-xyrm-gold text-xyrm-green-deep border-xyrm-gold/30 font-bold uppercase tracking-widest text-[10px] px-3 py-1">
            UPCS • Xam Yoonu Reew Mi
          </Badge>
          <h2 className="text-2xl font-black md:text-3xl lg:text-4xl tracking-tight leading-tight">
            Système de Gestion Financière & Adhésions
          </h2>
          <p className="text-white/85 text-xs md:text-sm italic font-light leading-relaxed border-l-2 border-xyrm-gold pl-4 max-w-3xl">
            « Vulgariser le droit, les politiques publiques et toutes les sciences utiles à notre vivre-ensemble et à un développement harmonieux. »
          </p>
        </div>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Cotisations */}
        <Card className="hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
              Total des Cotisations
            </CardTitle>
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-black text-xyrm-slate-900">
              1 850 000 FCFA
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-emerald-600">+12.4%</span>
              <span className="text-xyrm-slate-400">depuis le mois dernier</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Membres Actifs */}
        <Card className="hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
              Membres Actifs
            </CardTitle>
            <div className="rounded-xl bg-xyrm-green-deep/5 p-2.5 text-xyrm-green-primary">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-black text-xyrm-slate-900">
              142 membres
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-xyrm-green-primary">+8 nouveaux</span>
              <span className="text-xyrm-slate-400">cette semaine</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Événements */}
        <Card className="hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
              Événements à Venir
            </CardTitle>
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
              <Calendar className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-black text-xyrm-slate-900">
              2 Événements
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-xyrm-gold-dark">Journée 23 Mai</span>
              <span className="text-xyrm-slate-400">Forum Participatif</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Factures en Attente */}
        <Card className="hover:-translate-y-1 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
              Factures en Attente
            </CardTitle>
            <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600">
              <AlertCircle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-black text-rose-600">
              450 000 FCFA
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-rose-600">5 factures</span>
              <span className="text-xyrm-slate-400">nécessitent attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Analytics / Chart Block */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-xyrm-slate-100 pb-4">
          <div>
            <CardTitle className="text-base font-bold text-xyrm-slate-900">Performance Trimestrielle</CardTitle>
            <CardDescription className="text-xs">Flux de cotisations et dons collectés (XOF)</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-xyrm-slate-200 hover:bg-xyrm-slate-50 text-xyrm-slate-700">
              <Download className="h-3.5 w-3.5" />
              Exporter
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Custom SVG / Pure CSS Visual Chart */}
          <div className="space-y-6">
            <div className="flex items-end justify-between h-48 pt-4 px-2 border-b border-xyrm-slate-200">
              {[
                { month: "Janvier", value: 340000, height: "35%" },
                { month: "Février", value: 480000, height: "50%" },
                { month: "Mars", value: 520000, height: "55%" },
                { month: "Avril", value: 680000, height: "70%" },
                { month: "Mai", value: 890000, height: "92%" },
                { month: "Juin", value: 600000, height: "62%" },
              ].map((data, index) => (
                <div key={index} className="flex flex-col items-center w-[12%] group cursor-pointer">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-xyrm-slate-900 text-white text-[10px] py-1 px-2 rounded absolute -translate-y-12 shadow-md font-mono">
                    {formatCurrency(data.value)}
                  </div>
                  {/* Bar */}
                  <div 
                    className="w-full bg-xyrm-green-deep/10 group-hover:bg-xyrm-green-primary rounded-t-lg transition-all duration-500 ease-out" 
                    style={{ height: data.height }}
                  />
                  <div className="w-1.5 h-1.5 rounded-full bg-xyrm-gold -mt-1 opacity-0 group-hover:opacity-100" />
                  <span className="text-[10px] text-xyrm-slate-500 mt-2 font-medium truncate w-full text-center">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-xyrm-slate-500 px-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-xyrm-green-primary" />
                  <span>Cotisations Collectées</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-xyrm-gold" />
                  <span>Objectif Mensuel</span>
                </div>
              </div>
              <span className="font-semibold text-xyrm-green-deep">Total collecté: 3 510 000 FCFA</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Table Section */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-xyrm-slate-100 pb-5">
          <div>
            <CardTitle className="text-base font-bold text-xyrm-slate-900">Factures Récentes</CardTitle>
            <CardDescription className="text-xs">
              Liste des transactions, cotisations et dons de l&apos;association
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-xyrm-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-60 rounded-xl border border-xyrm-slate-200 bg-white py-1.5 pl-9 pr-4 text-xs text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-xyrm-green-deep text-white"
                    : "bg-xyrm-slate-100 hover:bg-xyrm-slate-200 text-xyrm-slate-700"
                }`}
              >
                Tout
              </button>
              {(["payee", "envoyee", "brouillon", "en retard"] as BadgeVariant[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    filter === status
                      ? "bg-xyrm-green-deep text-white"
                      : "bg-xyrm-slate-100 hover:bg-xyrm-slate-200 text-xyrm-slate-700"
                  }`}
                >
                  {status === "payee" ? "Payée" : status === "envoyee" ? "Envoyée" : status === "brouillon" ? "Brouillon" : "En retard"}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="border-b border-xyrm-slate-100 bg-xyrm-slate-50/70 text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
                  <th className="px-6 py-4">Référence</th>
                  <th className="px-6 py-4">Membre</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Montant</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-xyrm-slate-100 text-sm">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-xyrm-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-xyrm-slate-600">
                        {inv.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors">
                            {inv.memberName}
                          </span>
                          <span className="text-xxs text-xyrm-slate-400">
                            {inv.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xyrm-slate-600">
                        {inv.type}
                      </td>
                      <td className="px-6 py-4 text-xs text-xyrm-slate-500">
                        {inv.date}
                      </td>
                      <td className="px-6 py-4 font-bold text-xyrm-slate-900">
                        {formatCurrency(inv.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={inv.status}>
                          {inv.status === "payee" ? "Payée" : inv.status === "envoyee" ? "Envoyée" : inv.status === "brouillon" ? "Brouillon" : "En retard"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded-lg border border-xyrm-slate-200 px-3 py-1.5 text-xs font-semibold text-xyrm-slate-700 hover:bg-xyrm-slate-50 hover:text-xyrm-slate-900 transition-colors">
                            Détails
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-xyrm-slate-400">
                      Aucune facture trouvée avec ces critères.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
