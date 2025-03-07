import Box from '@erxes/ui/src/components/Box';
import EmptyState from '@erxes/ui/src/components/EmptyState';
import Icon from '@erxes/ui/src/components/Icon';
import ModalTrigger from '@erxes/ui/src/components/ModalTrigger';
import Tip from '@erxes/ui/src/components/Tip';
import { __ } from '@erxes/ui/src/utils';
import { SectionBodyItem } from '@erxes/ui/src/layout/styles';
import { IProduct } from '@erxes/ui-products/src/types';
import React from 'react';
import ProductForm from '../containers/product/ProductForm';
import { CustomField, ProductName } from '../styles';
import { IDeal, IPaymentsData, IProductData } from '../types';

type Props = {
  productsData: IProductData[];
  products: IProduct[];
  paymentsData: IPaymentsData;
  onChangeProductsData: (productsData: IProductData[]) => void;
  onChangePaymentsData: (paymentsData: IPaymentsData) => void;
  onChangeProducts: (prs: IProduct[]) => void;
  saveProductsData: () => void;
  dealQuery: IDeal;
};

function ProductSection({
  products,
  productsData,
  paymentsData,
  onChangeProductsData,
  onChangePaymentsData,
  saveProductsData,
  dealQuery
}: Props) {
  const contentWithId = (productId?: string) => {
    const content = props => (
      <ProductForm
        {...props}
        currentProduct={productId}
        onChangeProductsData={onChangeProductsData}
        onChangePaymentsData={onChangePaymentsData}
        productsData={productsData}
        products={products}
        paymentsData={paymentsData}
        saveProductsData={saveProductsData}
        dealQuery={dealQuery}
      />
    );

    return content;
  };

  const tipItems = (product: IProduct) => {
    const result: React.ReactNode[] = [];

    const { customFieldsData } = product;

    Object.values(customFieldsData).forEach((field: any, index: number) => {
      result.push(
        <CustomField key={index}>
          <b>{field.text}:</b> {field.data}
        </CustomField>
      );
    });

    return result;
  };

  const renderProductFormModal = (
    trigger: React.ReactNode,
    productId?: string
  ) => {
    return (
      <ModalTrigger
        title="Manage Product & Service"
        size="lg"
        dialogClassName="modal-1000w"
        trigger={trigger}
        content={contentWithId(productId)}
      />
    );
  };

  const renderProductName = (productName: string, productId: string) => {
    return renderProductFormModal(
      <ProductName>
        {productName}
        <Icon icon="pen-1" />
      </ProductName>,
      productId
    );
  };

  const renderProduct = (product: IProduct) => {
    if (product.customFieldsData) {
      return (
        <Tip text={tipItems(product)} placement="bottom">
          {renderProductName(product.name, product._id)}
        </Tip>
      );
    }

    return renderProductName(product.name, product._id);
  };

  return (
    <Box
      title={__('Product & Service')}
      extraButtons={renderProductFormModal(
        <button>
          <Icon icon="edit-3" />
        </button>
      )}
      name="showProductAndService"
    >
      <div>
        {products.map((product, index) => (
          <SectionBodyItem key={index}>
            {renderProduct(product)}
          </SectionBodyItem>
        ))}
        {products.length === 0 && <EmptyState icon="list-ul" text="No items" />}
      </div>
    </Box>
  );
}

export default ProductSection;
