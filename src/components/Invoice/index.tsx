import { productSchema } from "@/constant/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useAccount, { Product } from "@/hooks/useAccount";
import { useMutation } from "@tanstack/react-query";
import Page from "../pageLoader";

const Invoice = () => {
  const { generateInvoice } = useAccount();
  const { mutate, isPending } = useMutation({
    mutationKey: ["billGenerate"],
    mutationFn: generateInvoice,
    onSuccess: () => {
      toast.success("download the invoice");
    },
    onError: () => {
      toast.error("Error downloading invoice");
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [{ item: "", rate: 0, quantity: 0 }],
    },
    resolver: yupResolver(productSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const appendItem = () => {
    append({ item: "", rate: 0, quantity: 0 });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast("You need at least 2 options to have a poll.");
    }
  };

  const submit = (data: { products?: Product[] }) => {
    // generateInvoice(data.products || []);
    mutate(data.products || []);
  };

  if (isPending) {
    return <Page />;
  }
  return (
    <div className="max-w-[1000px] m-auto my-10">
      <form onSubmit={handleSubmit(submit)}>
        <div className="px-3">
          {fields.map((item, index) => (
            <div key={item.id} className="grid my-3 gap-7">
              <Label>Product Name</Label>
              <Input
                placeholder={`Item ${index + 1} name`}
                type="text"
                name={`products[${index}].item`}
                control={control}
              />
              <p
                className={cn(
                  errors.products?.[index]?.item ? "visible" : "hidden",
                  "text-red-500"
                )}
              >
                {errors.products?.[index]?.item?.message || "Nothing"}
              </p>

              <Label>Product Rate</Label>
              <Input
                placeholder={`Item ${index + 1} rate`}
                type="number"
                name={`products[${index}].rate`}
                control={control}
              />
              <p
                className={cn(
                  errors.products?.[index]?.rate ? "visible" : "hidden",
                  "text-red-500"
                )}
              >
                {errors.products?.[index]?.rate?.message || "Nothing"}
              </p>

              <Label>Product Quantity</Label>
              <Input
                placeholder={`Item ${index + 1} quantity`}
                type="number"
                name={`products[${index}].quantity`}
                control={control}
              />
              <p
                className={cn(
                  errors.products?.[index]?.quantity ? "visible" : "hidden",
                  "text-red-500"
                )}
              >
                {errors.products?.[index]?.quantity?.message || "Nothing"}
              </p>

              <div className="flex justify-center gap-3">
                <Button type="button" onClick={() => removeItem(index)}>
                  Remove
                </Button>
                <Button type="button" onClick={appendItem}>
                  Add Item
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Invoice;
