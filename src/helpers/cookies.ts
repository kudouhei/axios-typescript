/* 
'username=hei; user-id=12345; user-roles=home, me, setting'
cookie: name = value
'(^| )' : get the beginning of each item
([^;]*) 表示的是除了";" 这个字符串别的都匹配
*/

const cookies = {
  read(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    );
    return match ? decodeURIComponent(match[3]) : null;
  },
};

export default cookies;
