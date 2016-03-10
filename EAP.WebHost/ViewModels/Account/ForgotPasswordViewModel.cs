using System.ComponentModel.DataAnnotations;

namespace EAP.WebHost.ViewModels.Account
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
