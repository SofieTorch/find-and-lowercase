# Find and lowercase
GitHub Action to find regex matches on files and transform them to lowercase.  
Based on [File Regex Replace](https://github.com/marketplace/actions/file-regex-replace) action.

## Parameters

| Name        | Required  | Default Value | Description   |
| ----------- | --------- | ------------- | ------------- |
|regex        | ✔️    | -             | The regex you want to search for. |
|flags        | ❌     | `g`           | regex flags in javascript, see [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags) |
|include      | ❌     | `.*`          | Filter out which files to be modified, this should be a regex. Note that match is checked on full path, any part of the path match will be modified. You may use `^path/to/file` to filter from the beginning of the files' path. <br/> By default, it matches every file.|
|exclude      | ❌     | `.^`          | Same as include. By default, it matches nothing. |
|encoding     | ❌     | `utf8`        | String encodings for files. By default, it uses UTF-8 |
|path         | ❌     | `.`           | Path you want to start walk with. By default, it starts from `.`(the root of the repo) |

## Example

```yml
    - name: Change url's to lowercase
      uses: SofieTorch/find-and-lowercase-action@v1.1.3
      with:
        regex: '<a href="([^"]+(\.html|#.+))">'
        flags: "g"                  # Optional, defaults to "g"
        include: 'package\.json'    # Optional, defaults to ".*"
        exclude: '.^'               # Optional, defaults to '.^'
        encoding: 'utf8'            # Optional, defaults to 'utf8'
        path: '.'                   # Optional, defaults to '.'
``` 
   
## Why Build This

While generating documentation and publishing it, the file names where changed to lowercase, so the redirection and navigation through
the web page was broken.
I created this action to fix it, changing a regex match to lowercase; in my case, changing the url's to lowercase when using this action.  
I found other interesting GitHub Actions to replace text based on regex, specially [this](https://github.com/marketplace/actions/file-regex-replace),
which is what I based this action on.
