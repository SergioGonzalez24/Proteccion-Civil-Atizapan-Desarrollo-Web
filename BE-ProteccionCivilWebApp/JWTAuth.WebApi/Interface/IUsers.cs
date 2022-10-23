using JWTAuth.WebApi.Models;

namespace JWTAuth.WebApi.Interface
{
    public interface IUsers
    {
        public List<User> GetUserDetails();

        public User GetUserDetails(int id);

        public void AddUser(User user);

        public void UpdateUser(User user);

        public User DeleteUser(int id);

        public bool CheckUser(int id);
        object GetUserDetails(string userName);
    }
}
