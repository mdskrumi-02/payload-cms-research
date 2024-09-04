import { CollectionConfig } from "payload/types";

import { CollectionBeforeChangeHook } from "payload/types";

const locales = ["es", "de"];

const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  console.log(data, req.locale, operation);

  if (req.locale === "en") {
    const payload = req.payload;

    for (let i = 0; i < locales.length; i++) {
      const result = await payload.update({
        collection: "pages",
        id: originalDoc.id,
        data: {
          title: data.title + " " + locales[i],
        },
        locale: locales[i],
        depth: 2,
      });

      console.log({ result });
    }
  }

  return data;
};

const Pages: CollectionConfig = {
  slug: "pages",
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
  ],
  hooks: {
    beforeChange: [beforeChangeHook],
  },
};

export default Pages;
