const CURRENCY_FORMATTER = new Intl.NumberFormat('de-DE', {
    currency: "EUR", style: "currency"
})

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}