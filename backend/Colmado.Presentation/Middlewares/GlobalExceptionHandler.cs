using Colmado.Domain.Exceptions;
using FluentValidation;
using System.Net;
using System.Text.Json;

namespace Colmado.Presentation.Middlewares
{
    public class GlobalExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");
                await HandleAsync(context, ex);
            }
        }

        private static Task HandleAsync(HttpContext context, Exception ex)
        {
            var (status, message) = ex switch
            {
                NotFoundException => (HttpStatusCode.NotFound, ex.Message),
                BadRequestException => (HttpStatusCode.BadRequest, ex.Message),
                ConflictException => (HttpStatusCode.Conflict, ex.Message),
                ValidationException vex => (HttpStatusCode.BadRequest,
                    string.Join("; ", vex.Errors.Select(e => $"{e.PropertyName}: {e.ErrorMessage}"))),
                _ => (HttpStatusCode.InternalServerError, "Ocurrió un error interno.")
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)status;
            return context.Response.WriteAsync(JsonSerializer.Serialize(new { error = message }));
        }
    }
}
