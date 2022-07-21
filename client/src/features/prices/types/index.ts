export interface PriceDTO {
    features: string //the array of features would be converted to strings seperated by commas
    title: string
    price: number
}


export interface Price extends PriceDTO {
  productId: string
  createdAt: Date
  updatedAt: Date
  creatorId: string
}