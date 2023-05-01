#!/bin/sh

if ["$1" = 'list']; then
    echo '
        - frontend application : localhost:3002
        - backend application : locahost:3001
        - database : localhost:3306
        - phpMyAdmin: locahost:8080
        - grafana : localhost:3000
    '
fi

