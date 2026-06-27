import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";
import Seo from "@/components/Seo";

const fallbackCategories = [
  {
    id: "food",
    name: "Food Commodities",
    tagline: "Rice, sugar, pulses, edible oils, spices.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "processed",
    name: "Processed & Packaged Foods",
    tagline: "Snacks, beverages, frozen foods, ready meals.",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fresh",
    name: "Fresh & Agricultural Products",
    tagline: "Fruits, vegetables, organic produce, floriculture.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "healthcare",
    name: "Healthcare & Hospital Supplies",
    tagline: "Medical devices, pharmaceuticals, hospital consumables.",
    image: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "home-textile",
    name: "Home Textile, Apparel & Hospitality Products",
    tagline: "Bed linen, towels, uniforms, hotel amenities.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "eco",
    name: "Eco-Friendly, Sustainable & Organic Products",
    tagline: "Biodegradable packaging, organic textiles, green alternatives.",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Categories() {
  const [categories, setCategories] = useState(fallbackCategories);
  useEffect(() => {
    api
      .get("/categories")
      .then(({ data }) => {
        if (Array.isArray(data) && data.length) setCategories(data);
      })
      .catch(() => {
        setCategories(fallbackCategories);
      });
  }, []);

  return (
    <div data-testid="categories-page">
      <Seo
        title="Categories — Elan Exports"
        description={`Active sourcing desks across six categories. We run dedicated supplier benches, audit calendars and price benchmarks for each.`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home" },
            { "@type": "ListItem", position: 2, name: "Categories" }
          ]
        }}
      />
      <section className="border-b hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="overline mb-4">Categories</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-light text-[#012D76] max-w-3xl">
            Active sourcing desks across <span className="gold-text">six categories.</span>
          </h1>
          <p className="mt-6 text-[#3A4759] max-w-2xl">
            We run dedicated supplier benches, audit calendars and price benchmarks for each. Click a
            category to see the brief format we use.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c, i) => (
            <div key={c.id} className="relative overflow-hidden border hairline bg-surface group" data-testid={`category-item-${c.id}`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="overline mb-3">{(i + 1).toString().padStart(2, "0")}</div>
                    <div className="font-display text-2xl text-[#012D76] tracking-tight mb-2">{c.name}</div>
                    <p className="text-[#3A4759] text-sm leading-relaxed">{c.tagline}</p>
                  </div>
                  <Link to="/buyer/intake" className="inline-flex items-center gap-2 text-[#C9A23F] hover:text-[#DBB85A] text-sm tracking-wide mt-6 self-start" data-testid={`category-cta-${c.id}`}>
                    Brief us on {c.name.split(" ")[0]} <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
