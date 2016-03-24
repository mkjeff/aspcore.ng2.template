using System.Threading.Tasks;

namespace EAP.WebHost.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
