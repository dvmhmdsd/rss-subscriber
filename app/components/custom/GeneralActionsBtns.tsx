import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";

export default function GeneralActionsBtns() {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();

  return (
    <section>
      <Button onClick={() => changeLanguage(language === "en" ? "ar" : "en")}>
        {t("lang")}
      </Button>
      <Link to="/">
        <Button variant="outline">{t("back_to_home")}</Button>
      </Link>
    </section>
  );
}
