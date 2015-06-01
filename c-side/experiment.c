# include <stdio.h>
# include <string.h>

# define BUFFLEN 200
# define DEVID 1

int main(int argc, char const *argv[])
{
	char buff[BUFFLEN]="";

	float	a=24.0,
			b=100.0,
			c=60.0;

	snprintf(buff, BUFFLEN,
		"GET /save?id=%d&temp=%.4f&wind=%.4f&humid=%.4f HTTP/1.0\r\n\r\n",
		DEVID,
		a, b, c
	);

	printf("--%s--\n", buff);

	return 0;
}
