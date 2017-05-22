;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xinfengpsd" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M854.215481 221.263792 169.784519 221.263792c-45.947013 0-83.342961 37.395948-83.342961 83.369558l0 414.759896c0 45.947013 37.395948 83.35626 83.342961 83.35626l684.44426 0c45.947013 0 83.342961-37.395948 83.342961-83.35626L937.57174 304.620052C937.558442 258.65974 900.162494 221.263792 854.215481 221.263792zM854.215481 274.924052c3.923117 0 7.660052 0.811221 11.091117 2.207584L520.511169 547.135169 172.510753 274.924052 854.215481 274.924052zM883.898182 719.393247c0 0.598442-0.146286 1.156987-0.172883 1.755429l-232.408104-163.84c-8.08561-5.705143-19.229922-3.750234-24.921766 4.308779s-3.763532 19.229922 4.308779 24.921766l229.615377 161.89839c-1.968208 0.41226-4.002909 0.651636-6.104104 0.651636l-671.318442 0 230.546286-162.550026c8.072312-5.691844 10.000623-16.862753 4.308779-24.921766-5.705143-8.059013-16.849455-10.013922-24.935065-4.308779L143.572779 733.024416c-2.141091-4.109299-3.470961-8.684052-3.470961-13.631169L140.101818 304.620052c0-2.978909 0.585143-5.811532 1.396364-8.537766l356.950442 279.219532c6.476468 5.066805 14.256208 7.593558 22.049247 7.593558 7.77974 0 15.572779-2.526753 22.049247-7.593558l341.337766-267.303896L883.884883 719.393247z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-suo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M713.874777 507.329631c-0.067538-13.537318-0.153496-33.31271-0.153496-46.242184L713.721281 255.824503c0-53.692876-21.041222-104.303554-59.246359-142.509714-38.207184-38.20616-88.817861-59.247382-142.526087-59.247382-53.688783 0-104.295368 21.040199-142.499481 59.243289-38.20309 38.20309-59.243289 88.810698-59.243289 142.499481l0 205.278293c0 12.857842-0.156566 32.206516-0.287549 46.133713-44.944632 49.900503-69.536726 113.774253-69.536726 181.434236 0 72.511477 28.237111 140.683113 79.510892 191.956893s119.445416 79.510892 191.956893 79.510892 140.683113-28.238135 191.95587-79.510892 79.510892-119.445416 79.510892-191.956893C783.316336 621.044532 758.756987 557.213761 713.874777 507.329631zM354.208231 255.810177c0-86.977957 70.761624-157.739581 157.755953-157.739581 86.986143 0 157.75493 70.768787 157.75493 157.75493l0 205.262944c0 2.067079 0.002047 4.311189 0.00614 6.671956-45.74588-32.843012-100.444667-50.571792-157.87568-50.571792-57.33687 0-111.950721 17.670451-157.651576 50.409087 0.007163-2.297322 0.011256-4.483104 0.011256-6.509251L354.209254 255.810177zM511.848551 916.121014c-125.424594 0-227.465618-102.041024-227.465618-227.465618s102.041024-227.465618 227.465618-227.465618c125.423571 0 227.464595 102.040001 227.464595 227.465618S637.273145 916.121014 511.848551 916.121014z"  ></path>' +
    '' +
    '<path d="M492.569462 673.804153l46.337351 0 0 158.705582-46.337351 0 0-158.705582Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-bbbb" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M750.933333 460.8 392.533333 460.8 392.533333 337.92c0-75.093333 61.44-136.533333 136.533333-136.533333 75.093333 0 136.533333 61.44 136.533333 136.533333l0 54.613333c0 0 3.413333 10.24 17.066667 10.24 13.653333 0 17.066667-10.24 17.066667-10.24L699.733333 337.92c0-95.573333-78.506667-170.666667-170.666667-170.666667s-170.666667 78.506667-170.666667 170.666667l0 122.88L269.653333 460.8c-27.306667 0-51.2 23.893333-51.2 51.2l0 307.2c0 27.306667 23.893333 51.2 51.2 51.2L750.933333 870.4c27.306667 0 51.2-23.893333 51.2-51.2l0-307.2C802.133333 484.693333 778.24 460.8 750.933333 460.8zM768 819.2c0 10.24-6.826667 17.066667-17.066667 17.066667L269.653333 836.266667c-10.24 0-17.066667-6.826667-17.066667-17.066667l0-307.2c0-10.24 6.826667-17.066667 17.066667-17.066667L750.933333 494.933333c10.24 0 17.066667 6.826667 17.066667 17.066667L768 819.2z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yanzhengma" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.225195 896.513477c-58.21582 0-137.03125-40.751172-205.546875-106.132031-75.232813-71.650391-118.223047-155.839453-118.223047-230.176758L188.455273 254.795313c0-11.195313 8.95625-20.599414 20.151758-20.599414l30.003516-0.447852c2.686914 0 65.380859-1.791211 129.866211-28.212305 68.067773-27.316797 113.29707-59.559375 113.744922-60.007227l17.9125-12.986719c3.582617-2.686914 7.612891-4.030273 12.091016-4.030273 4.478125 0 8.508594 1.343359 12.091016 4.030273l17.9125 12.986719c1.791211 1.343359 45.677148 32.69043 113.29707 60.007227 64.485352 26.421094 127.179297 28.212305 129.866211 28.212305l30.003516 0.447852c11.195313 0 20.151563 9.404102 20.151563 20.599414l0 305.40957c0 74.785156-42.990039 158.526367-118.223047 230.176758C649.704492 856.210156 570.889062 896.513477 512.225195 896.513477zM230.102148 560.652539c0 63.141797 38.512109 136.135547 105.236523 200.173047 59.111523 56.424609 130.314063 94.488867 176.886719 94.488867 46.572656 0 117.775195-38.064258 176.886719-94.488867 67.172266-64.0375 105.236523-137.03125 105.236523-200.173047l0-285.257813-9.851953 0c-3.134766 0-73.441602-2.239063-144.644141-31.34707-70.754688-28.660156-116.879687-61.350586-121.805664-64.933008l-5.82168-4.478125-5.821484 4.478125c-1.791211 1.343359-49.25957 35.377344-121.805664 64.933008-71.650391 29.108008-141.957227 30.899219-144.644141 31.34707l-9.851953 0L230.101953 560.652539zM475.952344 619.764063c-6.269336 0-12.091016-2.239063-16.569141-6.717188l-90.458594-90.90625c-4.478125-4.478125-6.717188-10.299805-6.717188-16.569141s2.239063-12.091016 6.717188-16.569141c4.478125-4.478125 10.299805-6.717188 16.569141-6.717188s12.091016 2.239063 16.569141 6.717188l73.889453 73.889453 164.347852-164.347852c4.478125-4.478125 10.299805-6.717188 16.569141-6.717188 6.269336 0 12.091016 2.239063 16.569141 6.717188 8.95625 8.95625 8.95625 24.182031 0 33.138281l-180.916992 180.917188C488.043359 617.077148 482.22168 619.764063 475.952344 619.764063z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-suo01" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M508.228093 527.470343c-11.492752 0-20.809955 7.716752-20.809955 17.234523l0 0.005117 0 131.520429 0 0.005117c0 9.518794 9.31618 17.234523 20.809955 17.234523 11.492752 0 20.809955-7.716752 20.809955-17.234523l0 0L529.038048 544.704866C529.038048 535.187095 519.720845 527.470343 508.228093 527.470343z"  ></path>' +
    '' +
    '<path d="M770.868839 351.153662l-45.1452 0L725.723639 281.176914c0-58.914808-21.806655-113.723088-61.402465-154.327878-40.361243-41.388643-95.795786-64.183811-156.093081-64.183811s-115.731838 22.794146-156.093081 64.183811c-39.59581 40.60479-61.402465 95.412047-61.402465 154.327878l0 69.977771-37.60241 0c-41.977044 0-76.127841 31.460526-76.127841 70.131267l0 378.37156c0 38.669718 34.150798 70.130244 76.127841 70.130244l517.738701 0c41.977044 0 76.127841-31.460526 76.127841-70.130244L846.99668 421.285952C846.99668 382.615211 812.845882 351.153662 770.868839 351.153662zM331.664795 281.176914c0-101.236706 75.905784-177.578418 176.563298-177.578418s176.563298 76.342736 176.563298 177.578418l0 69.977771L331.664795 351.154685 331.664795 281.176914zM806.064432 799.656489c0 16.099676-15.788591 29.197996-35.195593 29.197996L253.130138 828.854485c-19.407002 0-35.195593-13.098319-35.195593-29.197996L217.934544 421.285952c0-16.099676 15.788591-29.199019 35.195593-29.199019l517.738701 0c19.407002 0 35.195593 13.099343 35.195593 29.199019L806.064432 799.656489z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yanzhengma1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M816.458153 822.696228"  ></path>' +
    '' +
    '<path d="M760.840438 792.252869"  ></path>' +
    '' +
    '<path d="M891.678322 279.319613c-33.843806-2.336208-67.857481-8.694009-97.026824-18.034748-9.44614-2.840698-18.901489-5.988388-28.412097-9.394974-20.048615-5.903453-47.326888-17.616216-78.288041-34.305317-0.331551-0.151449-0.660032-0.340761-0.986467-0.517793-7.278777-3.928472-14.725376-8.120958-22.307052-12.574387-10.217712-5.852288-20.334117-12.096503-30.433126-18.602683-0.391926-0.264013-0.777713-0.499373-1.160429-0.756223-7.254218-4.684696-14.478759-9.523911-21.649066-14.548344-4.665253-3.200902-9.337669-6.610558-14.012132-9.993608-3.51301-2.575662-7.028067-4.996804-10.544147-7.65433-25.713638-19.205411-51.093678-40.753169-74.858942-63.967894-23.765263 23.214724-49.149397 44.76146-74.862012 63.967894-3.50994 2.656503-7.030114 5.077645-10.543124 7.65433-4.679579 3.38305-9.346879 6.79373-14.011108 9.993608-7.1744 5.025457-14.396895 9.863648-21.651113 14.548344-0.379647 0.25685-0.773619 0.49221-1.155313 0.756223-10.106172 6.507204-20.216437 12.750395-30.43415 18.602683-7.584746 4.451382-15.028275 8.645914-22.311145 12.574387-0.323365 0.176009-0.660032 0.36532-0.980327 0.517793-30.961152 16.688077-58.244542 28.399817-78.295204 34.305317-9.505491 3.411703-18.952654 6.5553-28.408003 9.394974-29.173436 9.340739-63.177901 15.69854-97.026824 18.034748l-0.081864 0c0.98749 15.169491 2.004657 35.291784 3.190669 57.07695 0.188288 0 0.407276 0 0.627287-0.032746 5.711072 81.306794 22.005176 196.961884 46.589085 264.914532 1.101077 2.968611 2.036379 6.067182 3.13848 9.005095 0.515746 1.381463 1.121544 2.661619 1.64036 4.034896 58.84113 151.910828 161.039743 262.443247 283.860023 302.956963l0 0.421602c16.23373 5.359055 29.912263 8.671497 40.712237 10.750855 10.79895-2.084475 24.483624-5.3918 40.717354-10.750855l0-0.421602c122.822326-40.513716 225.0148-151.046135 283.86207-302.956963 0.51984-1.38351 1.12359-2.653433 1.647523-4.034896 1.092891-2.937912 2.032286-6.036483 3.130294-9.005095 24.588001-67.954695 40.882106-183.608761 46.595224-264.914532 0.221034 0.031722 0.444115 0.031722 0.627287 0.031722 1.183965-21.784142 2.197038-41.903366 3.186576-57.075927L891.678322 279.319613 891.678322 279.319613zM847.281159 318.593082l-0.476861 8.903787c-0.487094 2.031263-0.809435 4.104481-0.957815 6.208399-5.320169 75.683726-20.259416 187.871855-44.322461 254.376525-0.665149 1.801019-1.289366 3.64297-1.906419 5.481851-0.385786 1.14508-0.765433 2.297322-1.355881 3.795443-0.49221 1.155313-0.971118 2.313695-1.297552 3.183506-54.710043 141.230582-148.790768 242.915495-258.124895 278.979876-1.768273 0.581238-3.476171 1.27504-5.116531 2.062985-7.419993 2.318812-14.686491 4.295839-21.728884 5.90857-6.995321-1.602498-14.231119-3.572362-21.635763-5.880941-1.664919-0.802272-3.399423-1.499144-5.197372-2.091638C375.821481 843.459111 281.741779 741.774197 227.137137 600.802512c-0.429789-1.130753-0.881067-2.228761-1.587148-3.888564-0.416486-1.105171-0.787946-2.245134-1.172709-3.384074-0.62217-1.840928-1.249457-3.686972-1.814322-5.213745-24.149003-66.748217-39.087227-178.938392-44.403303-254.606769-0.147356-2.111081-0.470721-4.194532-0.962931-6.228865l-0.466628-8.716522c-0.073678-1.39886-0.147356-2.789533-0.221034-4.167926 23.082718-3.567245 45.346791-8.718569 65.583694-15.20326 9.497305-2.856048 19.142989-6.034437 29.449729-9.707083 23.63121-7.103792 52.910047-19.895119 84.822874-37.061081 0.554632-0.284479 1.083681-0.565888 1.551332-0.823761 7.714705-4.161786 15.606443-8.609075 23.257703-13.101389 10.04068-5.748934 20.612457-12.21009 32.320103-19.748786 0.328481-0.209778 0.89437-0.573051 1.216711-0.793062 7.692193-4.969175 15.35164-10.103102 22.611997-15.192004 4.26207-2.920516 8.525164-6.001691 12.798491-9.093099l2.291183-1.657756 3.787256-2.730181c2.421142-1.731434 4.840238-3.469008 7.064906-5.151323 16.776082-12.534478 33.073256-25.737174 48.735981-39.48734 15.644305 13.735839 31.895431 26.910906 48.559972 39.356356 2.40477 1.815345 4.807493 3.540639 7.210215 5.259794l4.010337 2.891863 1.455141 1.056052c4.480035 3.245927 8.962116 6.490831 13.077853 9.30697 7.610328 5.337565 15.282055 10.475586 22.246677 14.96483l1.930979 1.261737c11.612479 7.482415 22.184255 13.945617 31.94148 19.533892 8.04114 4.717442 15.932878 9.163707 23.452131 13.222139 0.373507 0.203638 0.892323 0.475837 1.438769 0.75827 32.031531 17.253966 61.428048 30.106692 85.137029 37.236066 10.326183 3.676739 19.941168 6.844895 28.67611 9.461489 20.735253 6.640234 43.187615 11.850909 66.357314 15.440667C847.426469 315.91509 847.354837 317.250504 847.281159 318.593082L847.281159 318.593082zM697.776124 414.292678 478.090703 639.45688 365.627305 524.17939c-7.791453-7.983835-20.411889-7.983835-28.203342 0-7.791453 7.989975-7.791453 20.924565 0 28.91147l126.564557 129.729643c3.89675 3.993964 8.997931 5.991458 14.102183 5.991458 5.103228 0 10.205433-1.998517 14.100136-5.991458L725.978443 443.203124c7.791453-7.982812 7.791453-20.921495 0-28.9084C718.188013 406.307819 705.566554 406.307819 697.776124 414.292678L697.776124 414.292678z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shoufeikerentouxiang01" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M776.62903 881.604896 247.553119 881.604896c-30.119995 0-54.631248-24.511253-54.631248-54.631248l0-48.885384c0-88.833211 53.2856-168.45462 135.734404-202.838731 1.36816-0.547469 2.758834-1.094938 4.126994-1.61887-48.497551-47.517223-77.022211-113.526613-77.022211-183.093015 0-141.344169 115.00836-256.330016 256.352529-256.330016 141.320633 0 256.30648 114.985848 256.30648 256.330016 0 69.475328-28.569686 135.461181-77.135798 183.046966 1.36816 0.547469 2.736321 1.094938 4.104481 1.664919 81.126692 33.723056 135.689379 115.236558 135.689379 202.838731l0 48.885384C831.078129 857.093643 806.65795 881.604896 776.62903 881.604896zM512.113587 190.253088c-110.448508 0-200.307072 89.836051-200.307072 200.284559 0 70.797439 37.781488 136.874367 98.591459 172.421978 10.488889 6.133697 15.84692 18.332531 13.224186 30.211069-2.599198 11.879562-12.586666 20.703531-24.670889 21.866007-16.485463 1.596358-32.993438 5.65479-49.136094 12.084223-61.10673 25.491581-100.848872 84.819804-100.848872 150.966317l0 48.315402 526.066367-0.843204 0-47.472198c0-65.233724-40.677445-125.95262-101.190657-151.102417-10.329253-4.332678-20.497846-7.433296-30.27963-9.256828-5.836939-0.957815-12.334933-2.029216-18.810415-2.713808-12.015661-1.299599-21.843494-10.169617-24.396643-21.980617-2.530636-11.833513 2.804882-23.941272 13.247722-30.051433 60.924581-35.68371 98.774631-101.761662 98.774631-172.444491C712.375633 280.090163 622.539582 190.253088 512.113587 190.253088z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-suo1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M515.974594 323.026112c-63.593507 0-122.12844 19.511644-170.546224 53.476358V325.194072c0-93.944954 76.60127-170.546224 170.546224-170.546224S686.520819 231.249118 686.520819 325.194072c0 13.730416 11.562456 25.292872 25.292872 25.292872s25.292872-11.562456 25.292872-25.292872c0-122.12844-99.003529-221.131969-221.131969-221.131969S294.842625 203.065632 294.842625 325.194072v95.390261c-49.140438 53.476359-79.491884 125.019054-79.491884 203.065632 0 165.48765 135.136203 300.623853 300.623853 300.623853S816.598447 789.137615 816.598447 623.649965 681.462244 323.026112 515.974594 323.026112z m0 550.661961c-138.026817 0-250.038109-112.011291-250.038108-250.038108s112.011291-250.038109 250.038108-250.038109S766.012703 485.623147 766.012703 623.649965s-112.011291 250.038109-250.038109 250.038108z" fill="" ></path>' +
    '' +
    '<path d="M515.974594 721.93084m-27.460833 0a27.460833 27.460833 0 1 0 54.921666 0 27.460833 27.460833 0 1 0-54.921666 0Z" fill="" ></path>' +
    '' +
    '<path d="M515.974594 625.817925m-27.460833 0a27.460833 27.460833 0 1 0 54.921666 0 27.460833 27.460833 0 1 0-54.921666 0Z" fill="" ></path>' +
    '' +
    '<path d="M515.974594 529.705011m-27.460833 0a27.460833 27.460833 0 1 0 54.921666 0 27.460833 27.460833 0 1 0-54.921666 0Z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yanzhengma2" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M775.68 243.2c-64 0-158.72-17.92-220.16-117.76-10.24-15.36-28.16-25.6-43.52-25.6-17.92 0-33.28 7.68-43.52 25.6-61.44 97.28-156.16 117.76-220.16 117.76-40.96 0-69.12-7.68-69.12-7.68C179.2 849.92 512 921.6 512 921.6s332.8-71.68 332.8-686.08c0 0-28.16 7.68-69.12 7.68zM512 867.84c-51.2-17.92-263.68-120.32-281.6-573.44h15.36c112.64 0 204.8-38.4 263.68-140.8 58.88 92.16 151.04 140.8 263.68 140.8h15.36C775.68 750.08 563.2 849.92 512 867.84z" fill="" ></path>' +
    '' +
    '<path d="M614.4 417.28l-125.44 125.44-71.68-71.68c-10.24-10.24-25.6-10.24-35.84 0s-10.24 25.6 0 35.84l107.52 107.52 161.28-161.28c10.24-10.24 10.24-25.6 0-35.84s-25.6-10.24-35.84 0z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)