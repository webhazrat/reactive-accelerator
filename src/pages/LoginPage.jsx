import AuthIllustration from "../assets/images/auth_illustration.png";
import LoginForm from "../components/auth/LoginForm";
import { Link } from "react-router-dom";
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-deepDark py-8">
      <div className="max-w-6xl flex-1">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <img
              className="mb-12 max-w-full max-lg:hidden"
              src={AuthIllustration}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                Facehook
              </h1>
              <p className="max-w-[452px] text-gray-600/95 lg:text-lg">
                Create a social media app with features like, showing the post,
                post details, reactions, comments and profile.
              </p>
            </div>
          </div>
          <div className="card">
            <LoginForm />
            <div className="py-4 lg:py-6">
              <p className="text-center text-gray-600/95">
                Don’t have account?
                <Link
                  className="text-white transition-all hover:text-lwsGreen hover:underline ml-1"
                  to="/register"
                >
                  Create an accunt
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
