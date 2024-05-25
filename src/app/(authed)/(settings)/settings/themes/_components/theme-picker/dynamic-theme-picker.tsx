import dynamic from "next/dynamic";

export const ThemePickerDynamic = dynamic(
  async () =>
    (
      await import(
        "@/app/(authed)/(settings)/settings/themes/_components/theme-picker/theme-picker"
      )
    ).ThemePicker,
  {
    ssr: false,
  },
);
