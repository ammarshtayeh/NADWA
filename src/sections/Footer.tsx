import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/content';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { footer, navigation, event } = siteContent;

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.01] z-0"></div>
      <div className="absolute bottom-0 left-[-10%] w-[300px] h-[300px] glow-green rounded-full opacity-[0.05] blur-[100px] z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-900">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="font-extrabold text-lg md:text-xl text-slate-100">
                {footer.associationName}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {footer.associationDesc}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {event.partners.map((p) => (
                <span key={p.name} className="text-[11px] font-semibold text-slate-500 bg-slate-900 border border-slate-850 px-2.5 py-1 rounded-md">
                  {p.name}
                </span>
              ))}
            </div>
            <div className="hidden lg:block border-r-2 border-emerald-500 pr-3.5 mt-6 py-1">
              <p className="text-xs sm:text-sm text-emerald-400 font-medium italic leading-relaxed">
                "{footer.quote}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-slate-200 font-bold text-base">روابط سريعة</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-slate-200 font-bold text-base">{footer.contactTitle}</h3>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-red-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>{footer.date}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span>{footer.schedule}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{footer.location}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="block lg:hidden text-center px-4 py-2 border-r-2 border-emerald-500 pr-3 my-2">
            <p className="text-xs text-emerald-400 font-medium italic">
              "{footer.quote}"
            </p>
          </div>

          <p className="text-slate-500 text-xs text-center md:text-right">
            {footer.rights}
          </p>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
            <span>صُنع بحب</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>لفلسطين وللتعليم والعمل النقابي</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
