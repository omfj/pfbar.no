import { type GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Product } from "@prisma/client";
import toast from "react-hot-toast";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";

const productSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Du må gi produktet et navn" })
    .max(255, { message: "Navnet kan ikke være lengre enn 255 tegn" }),
  description: z
    .string()
    .min(1, { message: "Du må gi produktet en beskrivelse" })
    .max(255, { message: "Beskrivelsen kan ikke være lengre enn 255 tegn" }),
});

type ProductFrom = z.infer<typeof productSchema>;

const DashboardPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { data: products } = api.product.getAll.useQuery();

  const createProductMutation = api.product.create.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFrom>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFrom> = (data) => {
    try {
      createProductMutation.mutate(data);
      reset();
      setOpen(false);
      toast.success("Produktet ble lagt til");
    } catch {
      toast.error("Noe gikk galt. Prøv igjen senere.");
    }
  };

  return (
    <>
      <Head>
        <title>Produkter</title>
      </Head>
      <Container className="mx-auto w-full max-w-3xl">
        <h1 className="mb-3 text-4xl font-bold">Produkter</h1>
        <p className="mb-3 text-lg">
          Her kan du se alle produktene som er tilgjengelige på nettsiden. Du
          kan også legge til nye produkter, eller endre eksisterende.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Legg til produkt</Button>
          </DialogTrigger>
          <DialogContent>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Nytt produkt</DialogTitle>
                <DialogDescription>
                  Fyll inn feltene for å lage et nytt produkt
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Navn
                  </label>
                  <input
                    id="name"
                    className="col-span-3 border border-black p-2"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="col-span-3 col-start-2 text-sm text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="description" className="text-right">
                    Beskrivelse
                  </label>
                  <textarea
                    id="description"
                    className="col-span-3 border border-black p-2"
                    {...register("description")}
                  />
                  {errors.description && (
                    <span className="col-span-3 col-start-2 text-sm text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Legg til produkt</Button>
                <Button onClick={() => setOpen(false)}>Lukk</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <ul className="my-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {products?.map((product) => (
            <li key={product.id}>
              <ProductRow product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user.role === "ADMIN") {
    return {
      props: {
        session,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

type ProductRowProps = {
  product: Product;
};

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const [open, setOpen] = useState(false);

  const deleteProductMutation = api.product.delete.useMutation();
  const editProductMutation = api.product.edit.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFrom>({
    resolver: zodResolver(productSchema),
    values: {
      name: product.name,
      description: product.description,
    },
  });

  const handleDelete = () => {
    try {
      deleteProductMutation.mutate({ id: product.id });
      toast.success("Produktet ble fjernet");
    } catch {
      toast.error("Noe gikk galt. Prøv igjen senere.");
    }
  };

  const onSubmit: SubmitHandler<ProductFrom> = (data) => {
    try {
      editProductMutation.mutate({ ...data, id: product.id });
      reset();
      setOpen(false);
      toast.success("Produktet ble lagt til");
    } catch {
      toast.error("Noe gikk galt. Prøv igjen senere.");
    }
  };

  return (
    <div className="border border-black p-3">
      <p>
        <span className="font-semibold">ID:</span> {product.id}
      </p>

      <p>
        <span className="font-semibold">Navn:</span> {product.name}
      </p>

      <p>
        <span className="font-semibold">Beskrivelse:</span>{" "}
        {product.description}
      </p>

      <p>
        <span className="font-semibold">Laget:</span>{" "}
        {format(new Date(product.createdAt), "dd.MM.yyyy")}
      </p>

      <p>
        <span className="font-semibold">Sist oppdatert:</span>{" "}
        {format(new Date(product.updatedAt), "dd.MM.yyyy")}
      </p>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Button onClick={handleDelete}>Fjern</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Endre</Button>
          </DialogTrigger>
          <DialogContent>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Nytt produkt</DialogTitle>
                <DialogDescription>
                  Fyll inn feltene for å lage et nytt produkt
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Navn
                  </label>
                  <input
                    id="name"
                    className="col-span-3 border border-black p-2"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="col-span-3 col-start-2 text-sm text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="description" className="text-right">
                    Beskrivelse
                  </label>
                  <textarea
                    id="description"
                    className="col-span-3 border border-black p-2"
                    {...register("description")}
                  />
                  {errors.description && (
                    <span className="col-span-3 col-start-2 text-sm text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Legg til produkt</Button>
                <Button onClick={() => setOpen(false)}>Lukk</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DashboardPage;
