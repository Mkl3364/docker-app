import { useEffect, useState } from "react";

interface AlertInterface {
  body: string;
  duration: number;
}

const Alert = ({ body, duration }: AlertInterface) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (body) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [body, duration]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 100,
        width: "50%",
        padding: "8px",
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        transform: `translateY(${open ? 0 : "100%"})`,
        transition: "transform 0.3s ease-in-out",
      }}
      className="fixed bottom-0 left-100 w-52 p-8 bg-[#333] text-[#fff] text-center translate-y-100 "
    >
      {body}
    </div>
  );
};

export default Alert;
