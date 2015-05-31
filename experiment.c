# include <stdio.h>
# include <string.h>

# define BUFFLEN 200
# define DEVID 1

int main(int argc, char const *argv[])
{
	char buff[BUFFLEN]="";

	snprintf(buff, BUFFLEN,
		"GET /save?id=%d&temp=%.4f&wind=%.4f&humid=%.4f HTTP/1.0\r\n\r\n",
		DEVID,
		20.0, 100.0, 60.0
	);

	printf("--%s--\n", buff);

	return 0;
}
