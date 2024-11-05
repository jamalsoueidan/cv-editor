import { useNavigate } from "@remix-run/react";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export function useCreateResume() {
  const action = useMutation(api.resumes.create);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const create = async () => {
    setLoading(true);
    const response = await action({ title: "Untitled" });
    navigate(`/resumes/${response}`);
  };

  return { create, loading };
}
