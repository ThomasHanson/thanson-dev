import Link from "next/link";
import Page from "~/components/Page";

const ItemLink = ({ itemName, href }: { itemName: string; href: string }) => {
  return (
    <div className="mb-2">
      <Link href={href} className="text-blue-600 hover:underline" rel="noopener noreferrer" target="_blank">
        {itemName}
      </Link>
    </div>
  );
};

export default function Uses() {
  return (
    <Page>
      <section>
        <h1 className="text-3xl font-bold">Uses</h1>
        <span>Inspired by Wes Bos&apos; <Link href="https://github.com/wesbos/awesome-uses">awesome-uses</Link> collection.</span>

        <div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Hardware</h2>

          <ItemLink itemName="Apple - MacBook Pro - Intel Core i9 (15 inch, 16GB RAM, 512GB SSD) - Space Gray" href="https://www.bestbuy.com/site/apple-macbook-pro-15-4-display-with-touch-bar-intel-core-i9-16gb-memory-amd-radeon-pro-560x-512gb-ssd-space-gray/5430578.p?skuId=5430578" />

          <ItemLink itemName="ThinkPad T470s - Type 20HG" href="https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadt/thinkpad-t470s/22tp2tt470s" />

          <ItemLink itemName="2x Acer - Nitro 23.8 IPS LED FHD FreeSync Gaming Monitor" href="https://store.acer.com/en-us/23-8-nitro-xf3-gaming-monitor-xf243y-pbmiiprx" />

          <ItemLink itemName="Razer - DeathAdder V2 Pro Wireless Optical Gaming Mouse - Black" href="https://www.amazon.com/Razer-DeathAdder-Wireless-Gaming-Mouse/dp/B08FQMBKQG" />

          <ItemLink itemName="HyperX - QuadCast S Wired Multi-Pattern USB Electret Condenser Microphone" href="https://www.amazon.com/HyperX-QuadCast-Condenser-Microphone-Anti-Vibration/dp/B08G8WH435" />
        </div>
      </section>
    </Page>
  );
}
