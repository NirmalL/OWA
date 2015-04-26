# include <string.h>
# include <stdio.h>

int main ()
{
    char str[30];
    float one=13.9;

    snprintf(str, 30, "GET /save?temp=%f", one);
    printf("%s", str);

return 0;
}

