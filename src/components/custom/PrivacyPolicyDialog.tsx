import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { JSX } from "react";

export function PrivacyPolicyDialog(): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" className="text-sm opacity-60 text-zinc-700 dark:text-yellow-400 cursor-pointer">
          Privacy Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto ring-1 [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="[&::-webkit-scrollbar]:hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center font-bold">Privacy Policy</DialogTitle>
          </DialogHeader>
          <div>
            <h2 className="font-bold text-xl mb-2">Introduction</h2>
            <p>
              <strong>LowResify</strong> (“we”, “our”, or “us”) is committed to protecting your privacy. 
              This Privacy Policy explains how we handle information when you use our website and services.
            </p>

            <h2 className="font-bold text-xl my-2">Information We Do Not Collect</h2>
            <ul className="list-disc ml-7">
              <li>No personal data is collected.</li>
              <li>No tracking, cookies, or analytics.</li>
              <li>No image storage — all processing happens locally in your browser.</li>
            </ul>

            <h2 className="font-bold text-xl my-2">How Images Are Processed</h2>
            <p>
              Images are processed directly in your browser and exist only temporarily. 
              Once you leave or refresh the page, they are no longer available.
            </p>

            <h2 className="font-bold text-xl my-2">Third-Party Services</h2>
            <p><strong>LowResify</strong> does not integrate with or share data with third-party services.</p>

            <h2 className="font-bold text-xl my-2">Security</h2>
            <p>
              Because no data is sent to our servers, the risk of unauthorized access is minimized.
              However, we encourage you to always use our website over a secure connection (HTTPS).
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
