import { getAllProducts } from "@/lib/products";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main>
      <div className="bg-primary p-8 max-w-6xl w-full mx-auto rounded-3xl my-10 flex flex-col gap-10">
        <h1 className="text-3xl text-center font-semibold flex flex-col gap-2">
          <span>Velkommen til</span>
          <span className="text-5xl">Pink Flamingo</span>
        </h1>

        <p className="text-lg">
          Oppdag den sjarmerende og intime atmosfæren på Pink Flamingo, en unik
          liten bar gjemt bort på et loft i hjertet av Trondheim. Her venter en
          verden av koselig samvær, der hver kveld blir til et minneverdig
          eventyr. Bli med oss på en reise av smakfulle drinker, varm
          gjestfrihet, og en følelse av å være akkurat der du hører hjemme. På
          Pink Flamingo er hver gjest en del av familien. Vi gleder oss til å
          ønske deg velkommen til vårt lille hjørne av lykke!
        </p>
      </div>

      <div className="max-w-6xl w-full mx-auto my-10 grid grid-cols-2 gap-6">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="h-40 rounded-3xl border text-center p-4"
            >
              <a className="hover:underline" href={`/produkt/${product.id}`}>
                <h2 className="text-3xl font-medium">{product.name}</h2>
              </a>
              <p className="text-xl text-gray-800">{product.description}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
