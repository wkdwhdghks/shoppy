import { useState } from "react";

export default function NewProduct(): JSX.Element {
  interface ProductInfo {
    title?: string | undefined;
    price?: number | undefined;
    category?: string | undefined;
    description?: string | undefined;
    options?: string | undefined;
  }
  const [product, setProduct] = useState<ProductInfo>();
  const [file, setFile] = useState<File>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      if (files !== null) {
        setFile(files && files[0]);
      }
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product?.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product?.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product?.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product?.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product?.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분"
          required
          onChange={handleChange}
        />
        <button className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110">
          제품 등록하기
        </button>
      </form>
    </section>
  );
}
