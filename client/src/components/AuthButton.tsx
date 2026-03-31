import { useState } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { lovable } from "@/integrations/lovable";

const AuthButton = () => {
  const { user, loading, signOut } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogleLogin = async () => {
    setSigningIn(true);
    try {
      await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) return null;

  if (user) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border rounded-sm px-4 py-2 shadow-lg">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="w-7 h-7 rounded-full"
            />
          ) : (
            <User className="w-5 h-5 text-accent" />
          )}
          <span className="font-body text-sm text-foreground max-w-[120px] truncate">
            {user.user_metadata?.full_name || user.email?.split("@")[0]}
          </span>
          <button
            onClick={signOut}
            className="ml-2 p-1.5 rounded-sm hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={signingIn}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border rounded-sm px-5 py-2.5 shadow-lg font-body text-sm tracking-wide hover:bg-card transition-colors disabled:opacity-50"
    >
      <LogIn className="w-4 h-4 text-accent" />
      <span className="text-foreground">
        {signingIn ? "Entrando..." : "Entrar com Google"}
      </span>
    </button>
  );
};

export default AuthButton;
