declare module "google-translate-free" {
  const translate: (
    text: string,
    options: { to: string }
  ) => Promise<{ text: string }>;
  export = translate;
}
