import { Phone, Mail } from "lucide-react";
import { siteData } from "@/lib/siteData";

const TopBar = () => {
  const settings = siteData.getSettings();
  return (
    <div className="bg-[linear-gradient(120deg,#0b1224_0%,#2a101e_42%,#1f1f1f_100%)] text-primary-foreground text-xs py-2 hidden md:block">
      <div className="container-max px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={`tel:${settings.phone1.replace(/\s/g, "")}`} className="group flex items-center gap-1.5 hover:text-primary transition-colors duration-300">
            <Phone size={12} /> {settings.phone1}
            <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-8" />
          </a>
          <a href={`tel:${settings.phone2.replace(/\s/g, "")}`} className="group flex items-center gap-1.5 hover:text-primary transition-colors duration-300">
            <Phone size={12} /> {settings.phone2}
            <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-8" />
          </a>
        </div>
        <a href={`mailto:${settings.email}`} className="group flex items-center gap-1.5 hover:text-primary transition-colors duration-300">
          <Mail size={12} /> {settings.email}
          <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-8" />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
