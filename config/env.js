// Trong Node.js, env.js không phải là một file chuẩn hoặc 
// được khuyến khích. 
// Tuy nhiên, env.js có thể được sử dụng 
// để định nghĩa các biến môi trường (environment variables) 
// cho ứng dụng.

// Các biến môi trường là các giá trị được thiết lập bên ngoài 
// của ứng dụng và được sử dụng để cấu hình hoặc chứa thông tin 
// nhạy cảm như tên người dùng, mật khẩu hoặc các thông số 
// kết nối với database. Việc tách riêng các giá trị này 
// vào các biến môi trường giúp cho việc quản lý và bảo mật 
// ứng dụng dễ dàng hơn.

// Trong env.js, bạn có thể định nghĩa các biến môi trường bằng 
// cách sử dụng cú pháp sau:

// process.env.MY_VARIABLE = "my value";
// Sau khi đã định nghĩa các biến môi trường trong env.js, 
// bạn có thể sử dụng chúng trong ứng dụng bằng cách sử dụng 
// cú pháp process.env.MY_VARIABLE.

// Lưu ý rằng, việc lưu trữ thông tin nhạy cảm như mật khẩu 
// trực tiếp trong file mã nguồn là không an toàn. Thay vào đó,
//  chúng ta nên sử dụng các biến môi trường được đặt trên hệ thống 
//  hoặc được thiết lập qua các công cụ quản lý môi trường như dotenv.