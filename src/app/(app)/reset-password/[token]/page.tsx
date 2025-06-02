// app/reset-password/[token]/page.tsx
import ResetForm from "./ResetForm";

interface PageProps {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: PageProps) {
  // Next 15 will have already unwrapped `params.token` for us,
  // so we know `token` is a plain string.
  const { token } = params;

  // Render the client component and pass down `token` as a prop.
  return <ResetForm token={token} />;
}
