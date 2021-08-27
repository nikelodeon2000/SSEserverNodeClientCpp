#include <iostream>
#include "httplib.h"

int main() {
	httplib::Client cli("localhost:8080");//connect NO SEMICOLON
	cli.Get("/browser");
	while (true) {
		std::cout << "new" << std::endl;
		cli.Get("/stream", [&](const char* data, size_t data_length) {	//into get method instant
			std::cout << ".";
			std::cout << std::string(data, data_length); //doesn't finish cuz sent in chunks
			return true;
			});
	}
	
	return 0;
}