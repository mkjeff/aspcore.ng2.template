using System.Threading.Tasks;

namespace EAP.WebHost.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
