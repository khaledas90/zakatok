"use client";

import { CheckCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Done from "@/assets/done.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white p-0 overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-50"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-400 opacity-60" />
          </div>
          <div className="absolute top-16 right-12 animate-pulse delay-300">
            <Sparkles className="w-3 h-3 text-yellow-400 opacity-40" />
          </div>
          <div className="absolute bottom-20 left-16 animate-pulse delay-700">
            <Sparkles className="w-5 h-5 text-yellow-400 opacity-50" />
          </div>
          <div className="absolute bottom-12 right-8 animate-pulse delay-1000">
            <Sparkles className="w-3 h-3 text-yellow-400 opacity-60" />
          </div>
        </div>

        <div className="relative z-10 p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="relative bg-white p-4">
                <Image
                  src={Done}
                  alt="Done"
                  width={150}
                  height={150}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-center text-transparent animate-fade-in">
              شكرًا لك!
            </DialogTitle>
          </DialogHeader>

          <h3 className="text-lg font-semibold text-gray-700 mb-3 animate-slide-up delay-200">
            تم تقديم تبرعك بنجاح
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6 animate-slide-up delay-300">
            لقد تم استلام طلبك وسيتم مراجعته من قبل فريقنا المختص. سنتواصل معك
            قريباً لتأكيد التفاصيل.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
