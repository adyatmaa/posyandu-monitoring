import { Header } from "@/components/layout/Header";
import { LibraryBig, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { SpinnerShell } from "@/components/ui/spinner-shell";

export const Article = () => {
  return (
    <section>
      {/* <Header /> */}
      <motion.div
        key={`article`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center items-center my-20"
      >
        <section className="text-center">
          <img className="w-96" src="/empty.png" alt="" />
          <div className="flex items-center justify-center gap-2 mb-4">
            <SpinnerShell />
            Nothing here, yet...
          </div>
          <p className="text-gray-700 text-sm">
            Pantau informasi terbaru posyandu desa disini.
          </p>
        </section>
      </motion.div>
    </section>
  );
};
