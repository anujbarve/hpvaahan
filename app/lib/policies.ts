export const POLICY_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    title
    body
  }
  query Policy(
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) { ...PolicyItem }
      refundPolicy @include(if: $refundPolicy) { ...PolicyItem }
      shippingPolicy @include(if: $shippingPolicy) { ...PolicyItem }
      termsOfService @include(if: $termsOfService) { ...PolicyItem }
    }
  }
` as const;
