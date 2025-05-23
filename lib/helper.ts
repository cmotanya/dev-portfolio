import { SelectedItem, ServiceItem } from "@/app/data/service-quotation";
import { Dispatch, SetStateAction } from "react";

type AddItemParams = {
  item: ServiceItem;
  selectedItems: SelectedItem[];
  setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>;
};
export const AddItem = ({
  item,
  selectedItems,
  setSelectedItems,
}: AddItemParams) => {
  const defaultOption: Record<string, string> = {};

  if (item.options) {
    Object.entries(item.options).forEach(([key, values]) => {
      if (values) {
        defaultOption[key] = values[0];
      }
    });
  }

  const existingItemIndex = selectedItems.findIndex(
    (selected) =>
      selected.id === item.id &&
      JSON.stringify(selected.selectedOptions) ===
        JSON.stringify(defaultOption),
  );

  if (existingItemIndex !== -1) {
    setSelectedItems((prev) =>
      prev.map((selected, index) =>
        index === existingItemIndex
          ? { ...selected, quantity: selected.quantity + 1 }
          : selected,
      ),
    );
  } else {
    setSelectedItems((prev) => [
      ...prev,
      {
        ...item,
        quantity: 1,
        selectedOptions: defaultOption,
      },
    ]);
  }
};

type RemoveItemsParam = {
  index: number;
  setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>;
};
export const removeItem = ({ index, setSelectedItems }: RemoveItemsParam) => {
  setSelectedItems((prev) => prev.filter((_, i) => i !== index));
};

type UpdateItemProp = {
  index: number;
  optionKey: string;
  optionValue: string;
  setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>;
};
export const updateItemOption = ({
  index,
  optionKey,
  optionValue,
  setSelectedItems,
}: UpdateItemProp) => {
  setSelectedItems((prev) =>
    prev.map((item, i) =>
      i === index
        ? {
            ...item,
            selectedOptions: {
              ...item.selectedOptions,
              [optionKey]: optionValue,
            },
          }
        : item,
    ),
  );
};

type UpdateQuantityProp = {
  index: number;
  quantity: number;
  setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>;
};
export const updateQuantity = ({
  index,
  quantity,
  setSelectedItems,
}: UpdateQuantityProp) => {
  if (quantity <= 0) {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  } else {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item)),
    );
  }
};

type customerPriceProps = {
  index: number;
  customPrice: number;
  setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>;
};
export const updateCustomPrice = ({
  index,
  customPrice,
  setSelectedItems,
}: customerPriceProps) => {
  setSelectedItems((prev) =>
    prev.map((item, i) => (i === index ? { ...item, customPrice } : item)),
  );
};
