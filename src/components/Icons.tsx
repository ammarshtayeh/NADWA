import React from 'react';
import {
  Baby,
  GraduationCap,
  LayoutDashboard,
  Users,
  Sparkles,
  FileText,
  BookOpen,
  CheckSquare,
  Presentation,
  ShieldAlert,
  Briefcase,
  FileSpreadsheet,
  FileCheck,
  TrendingUp,
  Megaphone,
  HeartHandshake,
  Bot,
  Coffee,
  Cpu,
  Laptop,
  ShieldCheck,
  HelpCircle,
  Terminal,
  Smile,
  MessagesSquare,
  Lock,
  ClipboardList,
  Mic,
  Wrench,
  Utensils,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  PenLine,
  Shuffle,
  Heart,
  Copy,
  List,
  Globe,
  Languages,
  Hand,
  Type,
  Image,
  Search,
  User
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Baby,
  GraduationCap,
  LayoutDashboard,
  Users,
  Sparkles,
  FileText,
  BookOpen,
  CheckSquare,
  Presentation,
  ShieldAlert,
  Briefcase,
  FileSpreadsheet,
  FileCheck,
  TrendingUp,
  Megaphone,
  HeartHandshake,
  Bot,
  Coffee,
  Cpu,
  Laptop,
  ShieldCheck,
  HelpCircle,
  Terminal,
  Smile,
  MessagesSquare,
  Lock,
  ClipboardList,
  Mic,
  Wrench,
  Utensils,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  PenLine,
  Shuffle,
  Heart,
  Copy,
  List,
  Globe,
  Languages,
  Hand,
  Type,
  Image,
  Search,
  User
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 24, ...props }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    // Return a default icon or null if not found
    return <Sparkles className={className} size={size} {...props} />;
  }
  return <IconComponent className={className} size={size} {...props} />;
};

export default Icon;
