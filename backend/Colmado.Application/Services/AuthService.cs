using AutoMapper;
using Colmado.Application.DTOs.Auth;
using Colmado.Application.Interfaces;
using Colmado.Application.Interfaces.Auth;
using Colmado.Application.Interfaces.Services;
using Colmado.Domain.Entities;
using Colmado.Domain.Exceptions;

namespace Colmado.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _uow;
        private readonly IPasswordHasher _hasher;
        private readonly IJwtTokenGenerator _jwt;
        private readonly ICurrentUserService _currentUser;
        private readonly IMapper _mapper;

        public AuthService(IUnitOfWork uow, IPasswordHasher hasher, IJwtTokenGenerator jwt, ICurrentUserService currentUser, IMapper mapper)
        {
            _uow = uow;
            _hasher = hasher;
            _jwt = jwt;
            _currentUser = currentUser;
            _mapper = mapper;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto, CancellationToken ct = default)
        {
            var email = dto.Email.Trim().ToLowerInvariant();
            if (await _uow.Users.ExistsEmailAsync(email, ct))
                throw new ConflictException("El email ya está registrado.");

            var user = _mapper.Map<User>(dto);
            user.Id = Guid.NewGuid();
            user.Email = email;
            user.PasswordHash = _hasher.Hash(dto.Password);

            await _uow.Users.AddAsync(user, ct);
            await _uow.SaveChangesAsync(ct);

            return new AuthResponseDto
            {
                Token = _jwt.GenerateToken(user),
                User = _mapper.Map<UserProfileDto>(user)
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken ct = default)
        {
            var email = dto.Email.Trim().ToLowerInvariant();
            var user = await _uow.Users.GetByEmailAsync(email, ct)
                ?? throw new NotFoundException("Credenciales inválidas.");

            if (!_hasher.Verify(dto.Password, user.PasswordHash))
                throw new BadRequestException("Credenciales inválidas.");

            return new AuthResponseDto
            {
                Token = _jwt.GenerateToken(user),
                User = _mapper.Map<UserProfileDto>(user)
            };
        }

        public async Task<UserProfileDto> GetProfileAsync(CancellationToken ct = default)
        {
            var userId = _currentUser.UserId;
            var user = await _uow.Users.GetByIdAsync(userId, userId, ct)
                ?? throw new NotFoundException("Usuario no encontrado.");
            return _mapper.Map<UserProfileDto>(user);
        }
    }
}
