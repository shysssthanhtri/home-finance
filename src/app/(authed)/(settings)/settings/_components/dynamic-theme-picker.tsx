import dynamic from "next/dynamic";

export const ThemePickerDynamic = dynamic(
  async () =>
    (
      await import(
        "@/app/(authed)/(settings)/settings/_components/theme-picker"
      )
    ).ThemePicker,
  {
    ssr: false,
  },
);
