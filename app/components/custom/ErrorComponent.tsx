import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const ErrorComponent = ({
  error,
  linkText,
}: {
  error: string;
  linkText: string;
}) => {
  const {t} = useTranslation();
  return (
  <div className="text-center">
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
      {t(error)}
    </h1>
    <Link to="/">{t(linkText)}</Link>
  </div>
)};
