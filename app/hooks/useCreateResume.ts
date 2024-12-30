import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

export function useCreateResume() {
  const action = useMutation(api.resumes.create);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const create = useCallback(async () => {
    setLoading(true);
    const response = await action({ title: "Untitled" });
    navigate(`/resume/${response}`);
  }, [action, navigate]);

  return { create, loading };
}
