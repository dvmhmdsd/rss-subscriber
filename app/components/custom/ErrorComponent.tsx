import { Link } from "@remix-run/react";

export const ErrorComponent = ({
  error,
  linkText,
}: {
  error: string;
  linkText: string;
}) => (
  <div className="text-center">
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
      {error}
    </h1>
    <Link to="/">{linkText}</Link>
  </div>
);
