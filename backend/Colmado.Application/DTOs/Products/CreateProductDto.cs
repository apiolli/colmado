namespace Colmado.Application.DTOs.Products
{
    public class CreateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string SKU { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int Stock { get; set; }
        public int MinimunStock { get; set; }
        public string? Description { get; set; }
        public Guid CategoryId { get; set; }
    }
}
