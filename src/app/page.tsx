"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Download,
  Star,
  Zap,
  Circle,
} from "lucide-react";
import { useState } from "react";

const contactInfo = {
  name: "Alex Johnson",
  title: "Senior Frontend Developer",
  company: "TechCorp Solutions",
  phone: "+1 (555) 123-4567",
  email: "alex.johnson@techcorp.com",
  website: "www.alexjohnson.dev",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexjohnson",
  github: "github.com/alexjohnson",
  bio: "Passionate frontend developer with 5+ years of experience in React, Next.js, and modern web technologies.",
};

const styles = {
  modern: {
    name: "Modern",
    icon: Circle,
  },
  classic: {
    name: "Classic",
    icon: Star,
  },
  creative: {
    name: "Creative",
    icon: Zap,
  },
};

export default function DigitalNameCard() {
  const [currentStyle, setCurrentStyle] =
    useState<keyof typeof styles>("modern");

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:${contactInfo.company}
TITLE:${contactInfo.title}
TEL:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:${contactInfo.website}
ADR:;;${contactInfo.location};;;;
NOTE:${contactInfo.bio}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${contactInfo.name.replace(" ", "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const ModernStyle = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-sm mx-auto space-y-4">
        {/* Style Switcher */}
        <div className="flex justify-center gap-2 mb-6">
          {Object.entries(styles).map(([key, styleOption]) => {
            const IconComponent = styleOption.icon;
            return (
              <Button
                key={key}
                variant={currentStyle === key ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStyle(key as keyof typeof styles)}
                className={
                  currentStyle === key
                    ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {styleOption.name}
              </Button>
            );
          })}
        </div>

        {/* Modern Card */}
        <div className="bg-slate-800 border-slate-700 shadow-2xl rounded-2xl">
          <CardContent className="p-0">
            {/* Header Section with Geometric Design */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 relative overflow-hidden rounded-t-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-slate-800">
                    {contactInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {contactInfo.name}
                </h1>
                <p className="text-cyan-100 font-medium">{contactInfo.title}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span className="text-cyan-400 text-sm font-medium">
                  {contactInfo.company}
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {contactInfo.bio}
              </p>

              {/* Contact Grid */}
              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-slate-400">Phone</span>
                  </div>
                  <p className="text-sm text-white font-mono">
                    {contactInfo.phone}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-slate-400">Email</span>
                  </div>
                  <p className="text-sm text-white break-all">
                    {contactInfo.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-slate-400">Website</span>
                  </div>
                  <p className="text-sm text-white">{contactInfo.website}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs text-slate-400">Location</span>
                  </div>
                  <p className="text-sm text-white">{contactInfo.location}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={generateVCard}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save Contact
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Linkedin className="w-3 h-3 mr-1" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );

  const ClassicStyle = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-sm mx-auto space-y-4">
        {/* Style Switcher */}
        <div className="flex justify-center gap-2 mb-6">
          {Object.entries(styles).map(([key, styleOption]) => {
            const IconComponent = styleOption.icon;
            return (
              <Button
                key={key}
                variant={currentStyle === key ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStyle(key as keyof typeof styles)}
                className={
                  currentStyle === key
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-amber-300 text-amber-700 hover:bg-amber-50"
                }
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {styleOption.name}
              </Button>
            );
          })}
        </div>

        {/* Classic Card */}
        <Card className="bg-white border-4 border-amber-600 shadow-xl">
          <CardContent className="p-8">
            {/* Formal Header */}
            <div className="text-center border-b-2 border-amber-600 pb-6 mb-6">
              <div className="w-20 h-20 mx-auto mb-4 border-4 border-amber-600 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-xl font-bold text-amber-800 font-serif">
                  {contactInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-amber-900 mb-2 font-serif tracking-wide">
                {contactInfo.name}
              </h1>
              <div className="bg-amber-600 text-white px-4 py-1 rounded-full inline-block">
                <span className="text-sm font-medium">{contactInfo.title}</span>
              </div>
              <p className="text-amber-700 font-medium mt-2 font-serif">
                {contactInfo.company}
              </p>
            </div>

            {/* Bio Section */}
            <div className="text-center mb-6">
              <p className="text-amber-800 text-sm leading-relaxed font-serif italic">
                {contactInfo.bio}
              </p>
            </div>

            {/* Contact Information - Formal List */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">
                    Telephone
                  </span>
                </div>
                <span className="text-sm text-amber-800 font-mono">
                  {contactInfo.phone}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">
                    Electronic Mail
                  </span>
                </div>
                <span className="text-sm text-amber-800 break-all">
                  {contactInfo.email}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">
                    Website
                  </span>
                </div>
                <span className="text-sm text-amber-800">
                  {contactInfo.website}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">
                    Address
                  </span>
                </div>
                <span className="text-sm text-amber-800">
                  {contactInfo.location}
                </span>
              </div>
            </div>

            {/* Formal Actions */}
            <div className="space-y-3">
              <Button
                onClick={generateVCard}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif"
              >
                <Download className="w-4 h-4 mr-2" />
                Add to Address Book
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-amber-600 text-amber-700 hover:bg-amber-50 font-serif bg-transparent"
                >
                  <Linkedin className="w-4 h-4 mr-1" />
                  Professional Network
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-amber-600 text-amber-700 hover:bg-amber-50 font-serif bg-transparent"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Portfolio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CreativeStyle = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 p-4">
      <div className="max-w-sm mx-auto space-y-4">
        {/* Style Switcher */}
        <div className="flex justify-center gap-2 mb-6">
          {Object.entries(styles).map(([key, styleOption]) => {
            const IconComponent = styleOption.icon;
            return (
              <Button
                key={key}
                variant={currentStyle === key ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStyle(key as keyof typeof styles)}
                className={
                  currentStyle === key
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    : "border-purple-400 text-purple-300 hover:bg-purple-900/50"
                }
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {styleOption.name}
              </Button>
            );
          })}
        </div>

        {/* Creative Card */}
        <Card className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 border-0 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-0 relative overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full translate-x-16 translate-y-16"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-x-12 -translate-y-12"></div>
            </div>

            <div className="relative z-10 p-6">
              {/* Creative Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-black text-white -rotate-12">
                      {contactInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2 tracking-tight">
                  {contactInfo.name}
                </h1>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full inline-block transform -rotate-1">
                  <span className="text-sm font-bold">{contactInfo.title}</span>
                </div>
              </div>

              {/* Company Badge */}
              <div className="text-center mb-4">
                <Badge className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-0 px-3 py-1 transform rotate-1">
                  {contactInfo.company}
                </Badge>
              </div>

              {/* Bio with Creative Styling */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
                <p className="text-white text-sm leading-relaxed text-center font-medium">
                  {contactInfo.bio}
                </p>
              </div>

              {/* Contact Info - Creative Layout */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-3 border border-purple-400/30">
                  <Phone className="w-4 h-4 text-yellow-400 mb-1" />
                  <p className="text-xs text-purple-200 mb-1">Call Me</p>
                  <p className="text-sm text-white font-mono text-xs">
                    {contactInfo.phone}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-3 border border-pink-400/30">
                  <Mail className="w-4 h-4 text-cyan-400 mb-1" />
                  <p className="text-xs text-pink-200 mb-1">Email Me</p>
                  <p className="text-sm text-white break-all text-xs">
                    {contactInfo.email}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-3 border border-cyan-400/30">
                  <Globe className="w-4 h-4 text-green-400 mb-1" />
                  <p className="text-xs text-cyan-200 mb-1">Visit</p>
                  <p className="text-sm text-white text-xs">
                    {contactInfo.website}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-3 border border-green-400/30">
                  <MapPin className="w-4 h-4 text-orange-400 mb-1" />
                  <p className="text-xs text-green-200 mb-1">Find Me</p>
                  <p className="text-sm text-white text-xs">
                    {contactInfo.location}
                  </p>
                </div>
              </div>

              {/* Creative Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={generateVCard}
                  className="w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold border-0 shadow-lg transform hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4 mr-2" />✨ Save My Contact ✨
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 font-bold bg-transparent"
                  >
                    <Linkedin className="w-3 h-3 mr-1" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400/20 font-bold bg-transparent"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {currentStyle === "modern" && <ModernStyle />}
      {currentStyle === "classic" && <ClassicStyle />}
      {currentStyle === "creative" && <CreativeStyle />}
    </>
  );
}
