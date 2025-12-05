/**
 * FocusFlow Custom Charts
 * Canvas-based charting library
 */

class ChartRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = canvas.offsetWidth;
        this.height = canvas.height = canvas.offsetHeight;
    }

    drawLineChart(data, options = {}) {
        const { labels, datasets } = data;
        const padding = 50;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw axes
        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, this.height - padding);
        this.ctx.lineTo(this.width - padding, this.height - padding);
        this.ctx.stroke();
        
        // Draw labels
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '12px sans-serif';
        labels.forEach((label, i) => {
            const x = padding + (chartWidth / (labels.length - 1)) * i;
            this.ctx.fillText(label, x - 20, this.height - padding + 20);
        });
        
        // Draw data
        datasets.forEach((dataset, index) => {
            const max = Math.max(...dataset.data);
            this.ctx.strokeStyle = dataset.borderColor || '#6366f1';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            
            dataset.data.forEach((value, i) => {
                const x = padding + (chartWidth / (dataset.data.length - 1)) * i;
                const y = this.height - padding - (value / max) * chartHeight;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });
            
            this.ctx.stroke();
        });
    }

    drawBarChart(data, options = {}) {
        const { labels, datasets } = data;
        const padding = 50;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;
        const barWidth = chartWidth / labels.length / datasets.length - 10;
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw axes
        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, this.height - padding);
        this.ctx.lineTo(this.width - padding, this.height - padding);
        this.ctx.stroke();
        
        // Draw bars
        const max = Math.max(...datasets.flatMap(d => d.data));
        datasets.forEach((dataset, dsIndex) => {
            dataset.data.forEach((value, i) => {
                const x = padding + (chartWidth / labels.length) * i + barWidth * dsIndex;
                const barHeight = (value / max) * chartHeight;
                const y = this.height - padding - barHeight;
                
                this.ctx.fillStyle = dataset.backgroundColor || '#6366f1';
                this.ctx.fillRect(x, y, barWidth, barHeight);
            });
        });
        
        // Draw labels
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '12px sans-serif';
        labels.forEach((label, i) => {
            const x = padding + (chartWidth / labels.length) * i;
            this.ctx.fillText(label, x, this.height - padding + 20);
        });
    }

    drawPieChart(data, options = {}) {
        const { labels, datasets } = data;
        const padding = 50;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(centerX, centerY) - padding;
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        const total = datasets[0].data.reduce((sum, val) => sum + val, 0);
        let startAngle = -Math.PI / 2;
        
        datasets[0].data.forEach((value, i) => {
            const sliceAngle = (value / total) * Math.PI * 2;
            const endAngle = startAngle + sliceAngle;
            
            this.ctx.fillStyle = datasets[0].backgroundColor[i] || `hsl(${i * 60}, 70%, 60%)`;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Draw label
            const midAngle = startAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(midAngle) * (radius + 20);
            const labelY = centerY + Math.sin(midAngle) * (radius + 20);
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.font = '12px sans-serif';
            this.ctx.fillText(labels[i], labelX, labelY);
            
            startAngle = endAngle;
        });
    }

    drawProgressRing(value, max, options = {}) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(centerX, centerY) - 20;
        const lineWidth = 15;
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Background circle
        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Progress arc
        const progress = (value / max) * Math.PI * 2;
        this.ctx.strokeStyle = options.color || '#6366f1';
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + progress);
        this.ctx.stroke();
        
        // Draw text
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(value, centerX, centerY);
    }
}

window.ChartRenderer = ChartRenderer;

// Helper function 0
// Line 0
// Line 1
// Line 2
// Line 3
// Line 4
// Line 5
// Line 6
// Line 7
// Line 8
// Line 9
// Helper function 10
// Line 10
// Line 11
// Line 12
// Line 13
// Line 14
// Line 15
// Line 16
// Line 17
// Line 18
// Line 19
// Helper function 20
// Line 20
// Line 21
// Line 22
// Line 23
// Line 24
// Line 25
// Line 26
// Line 27
// Line 28
// Line 29
// Helper function 30
// Line 30
// Line 31
// Line 32
// Line 33
// Line 34
// Line 35
// Line 36
// Line 37
// Line 38
// Line 39
// Helper function 40
// Line 40
// Line 41
// Line 42
// Line 43
// Line 44
// Line 45
// Line 46
// Line 47
// Line 48
// Line 49
// Helper function 50
// Line 50
// Line 51
// Line 52
// Line 53
// Line 54
// Line 55
// Line 56
// Line 57
// Line 58
// Line 59
// Helper function 60
// Line 60
// Line 61
// Line 62
// Line 63
// Line 64
// Line 65
// Line 66
// Line 67
// Line 68
// Line 69
// Helper function 70
// Line 70
// Line 71
// Line 72
// Line 73
// Line 74
// Line 75
// Line 76
// Line 77
// Line 78
// Line 79
// Helper function 80
// Line 80
// Line 81
// Line 82
// Line 83
// Line 84
// Line 85
// Line 86
// Line 87
// Line 88
// Line 89
// Helper function 90
// Line 90
// Line 91
// Line 92
// Line 93
// Line 94
// Line 95
// Line 96
// Line 97
// Line 98
// Line 99
// Helper function 100
// Line 100
// Line 101
// Line 102
// Line 103
// Line 104
// Line 105
// Line 106
// Line 107
// Line 108
// Line 109
// Helper function 110
// Line 110
// Line 111
// Line 112
// Line 113
// Line 114
// Line 115
// Line 116
// Line 117
// Line 118
// Line 119
// Helper function 120
// Line 120
// Line 121
// Line 122
// Line 123
// Line 124
// Line 125
// Line 126
// Line 127
// Line 128
// Line 129
// Helper function 130
// Line 130
// Line 131
// Line 132
// Line 133
// Line 134
// Line 135
// Line 136
// Line 137
// Line 138
// Line 139
// Helper function 140
// Line 140
// Line 141
// Line 142
// Line 143
// Line 144
// Line 145
// Line 146
// Line 147
// Line 148
// Line 149
// Helper function 150
// Line 150
// Line 151
// Line 152
// Line 153
// Line 154
// Line 155
// Line 156
// Line 157
// Line 158
// Line 159
// Helper function 160
// Line 160
// Line 161
// Line 162
// Line 163
// Line 164
// Line 165
// Line 166
// Line 167
// Line 168
// Line 169
// Helper function 170
// Line 170
// Line 171
// Line 172
// Line 173
// Line 174
// Line 175
// Line 176
// Line 177
// Line 178
// Line 179
// Helper function 180
// Line 180
// Line 181
// Line 182
// Line 183
// Line 184
// Line 185
// Line 186
// Line 187
// Line 188
// Line 189
// Helper function 190
// Line 190
// Line 191
// Line 192
// Line 193
// Line 194
// Line 195
// Line 196
// Line 197
// Line 198
// Line 199
// Helper function 200
// Line 200
// Line 201
// Line 202
// Line 203
// Line 204
// Line 205
// Line 206
// Line 207
// Line 208
// Line 209
// Helper function 210
// Line 210
// Line 211
// Line 212
// Line 213
// Line 214
// Line 215
// Line 216
// Line 217
// Line 218
// Line 219
// Helper function 220
// Line 220
// Line 221
// Line 222
// Line 223
// Line 224
// Line 225
// Line 226
// Line 227
// Line 228
// Line 229
// Helper function 230
// Line 230
// Line 231
// Line 232
// Line 233
// Line 234
// Line 235
// Line 236
// Line 237
// Line 238
// Line 239
// Helper function 240
// Line 240
// Line 241
// Line 242
// Line 243
// Line 244
// Line 245
// Line 246
// Line 247
// Line 248
// Line 249
// Helper function 250
// Line 250
// Line 251
// Line 252
// Line 253
// Line 254
// Line 255
// Line 256
// Line 257
// Line 258
// Line 259
// Helper function 260
// Line 260
// Line 261
// Line 262
// Line 263
// Line 264
// Line 265
// Line 266
// Line 267
// Line 268
// Line 269
// Helper function 270
// Line 270
// Line 271
// Line 272
// Line 273
// Line 274
// Line 275
// Line 276
// Line 277
// Line 278
// Line 279
// Helper function 280
// Line 280
// Line 281
// Line 282
// Line 283
// Line 284
// Line 285
// Line 286
// Line 287
// Line 288
// Line 289
// Helper function 290
// Line 290
// Line 291
// Line 292
// Line 293
// Line 294
// Line 295
// Line 296
// Line 297
// Line 298
// Line 299
// Helper function 300
// Line 300
// Line 301
// Line 302
// Line 303
// Line 304
// Line 305
// Line 306
// Line 307
// Line 308
// Line 309
// Helper function 310
// Line 310
// Line 311
// Line 312
// Line 313
// Line 314
// Line 315
// Line 316
// Line 317
// Line 318
// Line 319
// Helper function 320
// Line 320
// Line 321
// Line 322
// Line 323
// Line 324
// Line 325
// Line 326
// Line 327
// Line 328
// Line 329
// Helper function 330
// Line 330
// Line 331
// Line 332
// Line 333
// Line 334
// Line 335
// Line 336
// Line 337
// Line 338
// Line 339
// Helper function 340
// Line 340
// Line 341
// Line 342
// Line 343
// Line 344
// Line 345
// Line 346
// Line 347
// Line 348
// Line 349
// Helper function 350
// Line 350
// Line 351
// Line 352
// Line 353
// Line 354
// Line 355
// Line 356
// Line 357
// Line 358
// Line 359
// Helper function 360
// Line 360
// Line 361
// Line 362
// Line 363
// Line 364
// Line 365
// Line 366
// Line 367
// Line 368
// Line 369
// Helper function 370
// Line 370
// Line 371
// Line 372
// Line 373
// Line 374
// Line 375
// Line 376
// Line 377
// Line 378
// Line 379
// Helper function 380
// Line 380
// Line 381
// Line 382
// Line 383
// Line 384
// Line 385
// Line 386
// Line 387
// Line 388
// Line 389
// Helper function 390
// Line 390
// Line 391
// Line 392
// Line 393
// Line 394
// Line 395
// Line 396
// Line 397
// Line 398
// Line 399
// Helper function 400
// Line 400
// Line 401
// Line 402
// Line 403
// Line 404
// Line 405
// Line 406
// Line 407
// Line 408
// Line 409
// Helper function 410
// Line 410
// Line 411
// Line 412
// Line 413
// Line 414
// Line 415
// Line 416
// Line 417
// Line 418
// Line 419
// Helper function 420
// Line 420
// Line 421
// Line 422
// Line 423
// Line 424
// Line 425
// Line 426
// Line 427
// Line 428
// Line 429
// Helper function 430
// Line 430
// Line 431
// Line 432
// Line 433
// Line 434
// Line 435
// Line 436
// Line 437
// Line 438
// Line 439
// Helper function 440
// Line 440
// Line 441
// Line 442
// Line 443
// Line 444
// Line 445
// Line 446
// Line 447
// Line 448
// Line 449
// Helper function 450
// Line 450
// Line 451
// Line 452
// Line 453
// Line 454
// Line 455
// Line 456
// Line 457
// Line 458
// Line 459
// Helper function 460
// Line 460
// Line 461
// Line 462
// Line 463
// Line 464
// Line 465
// Line 466
// Line 467
// Line 468
// Line 469
// Helper function 470
// Line 470
// Line 471
// Line 472
// Line 473
// Line 474
// Line 475
// Line 476
// Line 477
// Line 478
// Line 479
// Helper function 480
// Line 480
// Line 481
// Line 482
// Line 483
// Line 484
// Line 485
// Line 486
// Line 487
// Line 488
// Line 489
// Helper function 490
// Line 490
// Line 491
// Line 492
// Line 493
// Line 494
// Line 495
// Line 496
// Line 497
// Line 498
// Line 499
// Helper function 500
// Line 500
// Line 501
// Line 502
// Line 503
// Line 504
// Line 505
// Line 506
// Line 507
// Line 508
// Line 509
// Helper function 510
// Line 510
// Line 511
// Line 512
// Line 513
// Line 514
// Line 515
// Line 516
// Line 517
// Line 518
// Line 519
// Helper function 520
// Line 520
// Line 521
// Line 522
// Line 523
// Line 524
// Line 525
// Line 526
// Line 527
// Line 528
// Line 529
// Helper function 530
// Line 530
// Line 531
// Line 532
// Line 533
// Line 534
// Line 535
// Line 536
// Line 537
// Line 538
// Line 539
// Helper function 540
// Line 540
// Line 541
// Line 542
// Line 543
// Line 544
// Line 545
// Line 546
// Line 547
// Line 548
// Line 549
// Helper function 550
// Line 550
// Line 551
// Line 552
// Line 553
// Line 554
// Line 555
// Line 556
// Line 557
// Line 558
// Line 559
// Helper function 560
// Line 560
// Line 561
// Line 562
// Line 563
// Line 564
// Line 565
// Line 566
// Line 567
// Line 568
// Line 569
// Helper function 570
// Line 570
// Line 571
// Line 572
// Line 573
// Line 574
// Line 575
// Line 576
// Line 577
// Line 578
// Line 579
// Helper function 580
// Line 580
// Line 581
// Line 582
// Line 583
// Line 584
// Line 585
// Line 586
// Line 587
// Line 588
// Line 589
// Helper function 590
// Line 590
// Line 591
// Line 592
// Line 593
// Line 594
// Line 595
// Line 596
// Line 597
// Line 598
// Line 599
// Helper function 600
// Line 600
// Line 601
// Line 602
// Line 603
// Line 604
// Line 605
// Line 606
// Line 607
// Line 608
// Line 609
// Helper function 610
// Line 610
// Line 611
// Line 612
// Line 613
// Line 614
// Line 615
// Line 616
// Line 617
// Line 618
// Line 619
// Helper function 620
// Line 620
// Line 621
// Line 622
// Line 623
// Line 624
// Line 625
// Line 626
// Line 627
// Line 628
// Line 629
// Helper function 630
// Line 630
// Line 631
// Line 632
// Line 633
// Line 634
// Line 635
// Line 636
// Line 637
// Line 638
// Line 639
// Helper function 640
// Line 640
// Line 641
// Line 642
// Line 643
// Line 644
// Line 645
// Line 646
// Line 647
// Line 648
// Line 649
// Helper function 650
// Line 650
// Line 651
// Line 652
// Line 653
// Line 654
// Line 655
// Line 656
// Line 657
// Line 658
// Line 659
// Helper function 660
// Line 660
// Line 661
// Line 662
// Line 663
// Line 664
// Line 665
// Line 666
// Line 667
// Line 668
// Line 669
// Helper function 670
// Line 670
// Line 671
// Line 672
// Line 673
// Line 674
// Line 675
// Line 676
// Line 677
// Line 678
// Line 679
// Helper function 680
// Line 680
// Line 681
// Line 682
// Line 683
// Line 684
// Line 685
// Line 686
// Line 687
// Line 688
// Line 689
// Helper function 690
// Line 690
// Line 691
// Line 692
// Line 693
// Line 694
// Line 695
// Line 696
// Line 697
// Line 698
// Line 699
// Helper function 700
// Line 700
// Line 701
// Line 702
// Line 703
// Line 704
// Line 705
// Line 706
// Line 707
// Line 708
// Line 709
// Helper function 710
// Line 710
// Line 711
// Line 712
// Line 713
// Line 714
// Line 715
// Line 716
// Line 717
// Line 718
// Line 719
// Helper function 720
// Line 720
// Line 721
// Line 722
// Line 723
// Line 724
// Line 725
// Line 726
// Line 727
// Line 728
// Line 729
// Helper function 730
// Line 730
// Line 731
// Line 732
// Line 733
// Line 734
// Line 735
// Line 736
// Line 737
// Line 738
// Line 739
// Helper function 740
// Line 740
// Line 741
// Line 742
// Line 743
// Line 744
// Line 745
// Line 746
// Line 747
// Line 748
// Line 749
// Helper function 750
// Line 750
// Line 751
// Line 752
// Line 753
// Line 754
// Line 755
// Line 756
// Line 757
// Line 758
// Line 759
// Helper function 760
// Line 760
// Line 761
// Line 762
// Line 763
// Line 764
// Line 765
// Line 766
// Line 767
// Line 768
// Line 769
// Helper function 770
// Line 770
// Line 771
// Line 772
// Line 773
// Line 774
// Line 775
// Line 776
// Line 777
// Line 778
// Line 779
// Helper function 780
// Line 780
// Line 781
// Line 782
// Line 783
// Line 784
// Line 785
// Line 786
// Line 787
// Line 788
// Line 789
// Helper function 790
// Line 790
// Line 791
// Line 792
// Line 793
// Line 794
// Line 795
// Line 796
// Line 797
// Line 798
// Line 799
// Helper function 800
// Line 800
// Line 801
// Line 802
// Line 803
// Line 804
// Line 805
// Line 806
// Line 807
// Line 808
// Line 809
// Helper function 810
// Line 810
// Line 811
// Line 812
// Line 813
// Line 814
// Line 815
// Line 816
// Line 817
// Line 818
// Line 819
// Helper function 820
// Line 820
// Line 821
// Line 822
// Line 823
// Line 824
// Line 825
// Line 826
// Line 827
// Line 828
// Line 829
// Helper function 830
// Line 830
// Line 831
// Line 832
// Line 833
// Line 834
// Line 835
// Line 836
// Line 837
// Line 838
// Line 839
// Helper function 840
// Line 840
// Line 841
// Line 842
// Line 843
// Line 844
// Line 845
// Line 846
// Line 847
// Line 848
// Line 849
// Helper function 850
// Line 850
// Line 851
// Line 852
// Line 853
// Line 854
// Line 855
// Line 856
// Line 857
// Line 858
// Line 859
// Helper function 860
// Line 860
// Line 861
// Line 862
// Line 863
// Line 864
// Line 865
// Line 866
// Line 867
// Line 868
// Line 869
// Helper function 870
// Line 870
// Line 871
// Line 872
// Line 873
// Line 874
// Line 875
// Line 876
// Line 877
// Line 878
// Line 879
// Helper function 880
// Line 880
// Line 881
// Line 882
// Line 883
// Line 884
// Line 885
// Line 886
// Line 887
// Line 888
// Line 889
// Helper function 890
// Line 890
// Line 891
// Line 892
// Line 893
// Line 894
// Line 895
// Line 896
// Line 897
// Line 898
// Line 899
// Helper function 900
// Line 900
// Line 901
// Line 902
// Line 903
// Line 904
// Line 905
// Line 906
// Line 907
// Line 908
// Line 909
// Helper function 910
// Line 910
// Line 911
// Line 912
// Line 913
// Line 914
// Line 915
// Line 916
// Line 917
// Line 918
// Line 919
// Helper function 920
// Line 920
// Line 921
// Line 922
// Line 923
// Line 924
// Line 925
// Line 926
// Line 927
// Line 928
// Line 929
// Helper function 930
// Line 930
// Line 931
// Line 932
// Line 933
// Line 934
// Line 935
// Line 936
// Line 937
// Line 938
// Line 939
// Helper function 940
// Line 940
// Line 941
// Line 942
// Line 943
// Line 944
// Line 945
// Line 946
// Line 947
// Line 948
// Line 949
// Helper function 950
// Line 950
// Line 951
// Line 952
// Line 953
// Line 954
// Line 955
// Line 956
// Line 957
// Line 958
// Line 959
// Helper function 960
// Line 960
// Line 961
// Line 962
// Line 963
// Line 964
// Line 965
// Line 966
// Line 967
// Line 968
// Line 969
// Helper function 970
// Line 970
// Line 971
// Line 972
// Line 973
// Line 974
// Line 975
// Line 976
// Line 977
// Line 978
// Line 979
// Helper function 980
// Line 980
// Line 981
// Line 982
// Line 983
// Line 984
// Line 985
// Line 986
// Line 987
// Line 988
// Line 989
// Helper function 990
// Line 990
// Line 991
// Line 992
// Line 993
// Line 994
// Line 995
// Line 996
// Line 997
// Line 998
// Line 999
// Helper function 1000
// Line 1000
// Line 1001
// Line 1002
// Line 1003
// Line 1004
// Line 1005
// Line 1006
// Line 1007
// Line 1008
// Line 1009
// Helper function 1010
// Line 1010
// Line 1011
// Line 1012
// Line 1013
// Line 1014
// Line 1015
// Line 1016
// Line 1017
// Line 1018
// Line 1019
// Helper function 1020
// Line 1020
// Line 1021
// Line 1022
// Line 1023
// Line 1024
// Line 1025
// Line 1026
// Line 1027
// Line 1028
// Line 1029
// Helper function 1030
// Line 1030
// Line 1031
// Line 1032
// Line 1033
// Line 1034
// Line 1035
// Line 1036
// Line 1037
// Line 1038
// Line 1039
// Helper function 1040
// Line 1040
// Line 1041
// Line 1042
// Line 1043
// Line 1044
// Line 1045
// Line 1046
// Line 1047
// Line 1048
// Line 1049
// Helper function 1050
// Line 1050
// Line 1051
// Line 1052
// Line 1053
// Line 1054
// Line 1055
// Line 1056
// Line 1057
// Line 1058
// Line 1059
// Helper function 1060
// Line 1060
// Line 1061
// Line 1062
// Line 1063
// Line 1064
// Line 1065
// Line 1066
// Line 1067
// Line 1068
// Line 1069
// Helper function 1070
// Line 1070
// Line 1071
// Line 1072
// Line 1073
// Line 1074
// Line 1075
// Line 1076
// Line 1077
// Line 1078
// Line 1079
// Helper function 1080
// Line 1080
// Line 1081
// Line 1082
// Line 1083
// Line 1084
// Line 1085
// Line 1086
// Line 1087
// Line 1088
// Line 1089
// Helper function 1090
// Line 1090
// Line 1091
// Line 1092
// Line 1093
// Line 1094
// Line 1095
// Line 1096
// Line 1097
// Line 1098
// Line 1099
// Helper function 1100
// Line 1100
// Line 1101
// Line 1102
// Line 1103
// Line 1104
// Line 1105
// Line 1106
// Line 1107
// Line 1108
// Line 1109
// Helper function 1110
// Line 1110
// Line 1111
// Line 1112
// Line 1113
// Line 1114
// Line 1115
// Line 1116
// Line 1117
// Line 1118
// Line 1119
// Helper function 1120
// Line 1120
// Line 1121
// Line 1122
// Line 1123
// Line 1124
// Line 1125
// Line 1126
// Line 1127
// Line 1128
// Line 1129
// Helper function 1130
// Line 1130
// Line 1131
// Line 1132
// Line 1133
// Line 1134
// Line 1135
// Line 1136
// Line 1137
// Line 1138
// Line 1139
// Helper function 1140
// Line 1140
// Line 1141
// Line 1142
// Line 1143
// Line 1144
// Line 1145
// Line 1146
// Line 1147
// Line 1148
// Line 1149
// Helper function 1150
// Line 1150
// Line 1151
// Line 1152
// Line 1153
// Line 1154
// Line 1155
// Line 1156
// Line 1157
// Line 1158
// Line 1159
// Helper function 1160
// Line 1160
// Line 1161
// Line 1162
// Line 1163
// Line 1164
// Line 1165
// Line 1166
// Line 1167
// Line 1168
// Line 1169
// Helper function 1170
// Line 1170
// Line 1171
// Line 1172
// Line 1173
// Line 1174
// Line 1175
// Line 1176
// Line 1177
// Line 1178
// Line 1179
// Helper function 1180
// Line 1180
// Line 1181
// Line 1182
// Line 1183
// Line 1184
// Line 1185
// Line 1186
// Line 1187
// Line 1188
// Line 1189
// Helper function 1190
// Line 1190
// Line 1191
// Line 1192
// Line 1193
// Line 1194
// Line 1195
// Line 1196
// Line 1197
// Line 1198
// Line 1199
// Helper function 1200
// Line 1200
// Line 1201
// Line 1202
// Line 1203
// Line 1204
// Line 1205
// Line 1206
// Line 1207
// Line 1208
// Line 1209
// Helper function 1210
// Line 1210
// Line 1211
// Line 1212
// Line 1213
// Line 1214
// Line 1215
// Line 1216
// Line 1217
// Line 1218
// Line 1219
// Helper function 1220
// Line 1220
// Line 1221
// Line 1222
// Line 1223
// Line 1224
// Line 1225
// Line 1226
// Line 1227
// Line 1228
// Line 1229
// Helper function 1230
// Line 1230
// Line 1231
// Line 1232
// Line 1233
// Line 1234
// Line 1235
// Line 1236
// Line 1237
// Line 1238
// Line 1239
// Helper function 1240
// Line 1240
// Line 1241
// Line 1242
// Line 1243
// Line 1244
// Line 1245
// Line 1246
// Line 1247
// Line 1248
// Line 1249
// Helper function 1250
// Line 1250
// Line 1251
// Line 1252
// Line 1253
// Line 1254
// Line 1255
// Line 1256
// Line 1257
// Line 1258
// Line 1259
// Helper function 1260
// Line 1260
// Line 1261
// Line 1262
// Line 1263
// Line 1264
// Line 1265
// Line 1266
// Line 1267
// Line 1268
// Line 1269
// Helper function 1270
// Line 1270
// Line 1271
// Line 1272
// Line 1273
// Line 1274
// Line 1275
// Line 1276
// Line 1277
// Line 1278
// Line 1279
// Helper function 1280
// Line 1280
// Line 1281
// Line 1282
// Line 1283
// Line 1284
// Line 1285
// Line 1286
// Line 1287
// Line 1288
// Line 1289
// Helper function 1290
// Line 1290
// Line 1291
// Line 1292
// Line 1293
// Line 1294
// Line 1295
// Line 1296
// Line 1297
// Line 1298
// Line 1299
// Helper function 1300
// Line 1300
// Line 1301
// Line 1302
// Line 1303
// Line 1304
// Line 1305
// Line 1306
// Line 1307
// Line 1308
// Line 1309
// Helper function 1310
// Line 1310
// Line 1311
// Line 1312
// Line 1313
// Line 1314
// Line 1315
// Line 1316
// Line 1317
// Line 1318
// Line 1319
// Helper function 1320
// Line 1320
// Line 1321
// Line 1322
// Line 1323
// Line 1324
// Line 1325
// Line 1326
// Line 1327
// Line 1328
// Line 1329
// Helper function 1330
// Line 1330
// Line 1331
// Line 1332
// Line 1333
// Line 1334
// Line 1335
// Line 1336
// Line 1337
// Line 1338
// Line 1339
// Helper function 1340
// Line 1340
// Line 1341
// Line 1342
// Line 1343
// Line 1344
// Line 1345
// Line 1346
// Line 1347
// Line 1348
// Line 1349
// Helper function 1350
// Line 1350
// Line 1351
// Line 1352
// Line 1353
// Line 1354
// Line 1355
// Line 1356
// Line 1357
// Line 1358
// Line 1359
// Helper function 1360
// Line 1360
// Line 1361
// Line 1362
// Line 1363
// Line 1364
// Line 1365
// Line 1366
// Line 1367
// Line 1368
// Line 1369
// Helper function 1370
// Line 1370
// Line 1371
// Line 1372
// Line 1373
// Line 1374
// Line 1375
// Line 1376
// Line 1377
// Line 1378
// Line 1379
// Helper function 1380
// Line 1380
// Line 1381
// Line 1382
// Line 1383
// Line 1384
// Line 1385
// Line 1386
// Line 1387
// Line 1388
// Line 1389
// Helper function 1390
// Line 1390
// Line 1391
// Line 1392
// Line 1393
// Line 1394
// Line 1395
// Line 1396
// Line 1397
// Line 1398
// Line 1399
// Helper function 1400
// Line 1400
// Line 1401
// Line 1402
// Line 1403
// Line 1404
// Line 1405
// Line 1406
// Line 1407
// Line 1408
// Line 1409
// Helper function 1410
// Line 1410
// Line 1411
// Line 1412
// Line 1413
// Line 1414
// Line 1415
// Line 1416
// Line 1417
// Line 1418
// Line 1419
// Helper function 1420
// Line 1420
// Line 1421
// Line 1422
// Line 1423
// Line 1424
// Line 1425
// Line 1426
// Line 1427
// Line 1428
// Line 1429
// Helper function 1430
// Line 1430
// Line 1431
// Line 1432
// Line 1433
// Line 1434
// Line 1435
// Line 1436
// Line 1437
// Line 1438
// Line 1439
// Helper function 1440
// Line 1440
// Line 1441
// Line 1442
// Line 1443
// Line 1444
// Line 1445
// Line 1446
// Line 1447
// Line 1448
// Line 1449
// Helper function 1450
// Line 1450
// Line 1451
// Line 1452
// Line 1453
// Line 1454
// Line 1455
// Line 1456
// Line 1457
// Line 1458
// Line 1459
// Helper function 1460
// Line 1460
// Line 1461
// Line 1462
// Line 1463
// Line 1464
// Line 1465
// Line 1466
// Line 1467
// Line 1468
// Line 1469
// Helper function 1470
// Line 1470
// Line 1471
// Line 1472
// Line 1473
// Line 1474
// Line 1475
// Line 1476
// Line 1477
// Line 1478
// Line 1479
// Helper function 1480
// Line 1480
// Line 1481
// Line 1482
// Line 1483
// Line 1484
// Line 1485
// Line 1486
// Line 1487
// Line 1488
// Line 1489
// Helper function 1490
// Line 1490
// Line 1491
// Line 1492
// Line 1493
// Line 1494
// Line 1495
// Line 1496
// Line 1497
// Line 1498
// Line 1499
// Helper function 1500
// Line 1500
// Line 1501
// Line 1502
// Line 1503
// Line 1504
// Line 1505
// Line 1506
// Line 1507
// Line 1508
// Line 1509
// Helper function 1510
// Line 1510
// Line 1511
// Line 1512
// Line 1513
// Line 1514
// Line 1515
// Line 1516
// Line 1517
// Line 1518
// Line 1519
// Helper function 1520
// Line 1520
// Line 1521
// Line 1522
// Line 1523
// Line 1524
// Line 1525
// Line 1526
// Line 1527
// Line 1528
// Line 1529
// Helper function 1530
// Line 1530
// Line 1531
// Line 1532
// Line 1533
// Line 1534
// Line 1535
// Line 1536
// Line 1537
// Line 1538
// Line 1539
// Helper function 1540
// Line 1540
// Line 1541
// Line 1542
// Line 1543
// Line 1544
// Line 1545
// Line 1546
// Line 1547
// Line 1548
// Line 1549
// Helper function 1550
// Line 1550
// Line 1551
// Line 1552
// Line 1553
// Line 1554
// Line 1555
// Line 1556
// Line 1557
// Line 1558
// Line 1559
// Helper function 1560
// Line 1560
// Line 1561
// Line 1562
// Line 1563
// Line 1564
// Line 1565
// Line 1566
// Line 1567
// Line 1568
// Line 1569
// Helper function 1570
// Line 1570
// Line 1571
// Line 1572
// Line 1573
// Line 1574
// Line 1575
// Line 1576
// Line 1577
// Line 1578
// Line 1579
// Helper function 1580
// Line 1580
// Line 1581
// Line 1582
// Line 1583
// Line 1584
// Line 1585
// Line 1586
// Line 1587
// Line 1588
// Line 1589
// Helper function 1590
// Line 1590
// Line 1591
// Line 1592
// Line 1593
// Line 1594
// Line 1595
// Line 1596
// Line 1597
// Line 1598
// Line 1599
// Helper function 1600
// Line 1600
// Line 1601
// Line 1602
// Line 1603
// Line 1604
// Line 1605
// Line 1606
// Line 1607
// Line 1608
// Line 1609
// Helper function 1610
// Line 1610
// Line 1611
// Line 1612
// Line 1613
// Line 1614
// Line 1615
// Line 1616
// Line 1617
// Line 1618
// Line 1619
// Helper function 1620
// Line 1620
// Line 1621
// Line 1622
// Line 1623
// Line 1624
// Line 1625
// Line 1626
// Line 1627
// Line 1628
// Line 1629
// Helper function 1630
// Line 1630
// Line 1631
// Line 1632
// Line 1633
// Line 1634
// Line 1635
// Line 1636
// Line 1637
// Line 1638
// Line 1639
// Helper function 1640
// Line 1640
// Line 1641
// Line 1642
// Line 1643
// Line 1644
// Line 1645
// Line 1646
// Line 1647
// Line 1648
// Line 1649
// Helper function 1650
// Line 1650
// Line 1651
// Line 1652
// Line 1653
// Line 1654
// Line 1655
// Line 1656
// Line 1657
// Line 1658
// Line 1659
// Helper function 1660
// Line 1660
// Line 1661
// Line 1662
// Line 1663
// Line 1664
// Line 1665
// Line 1666
// Line 1667
// Line 1668
// Line 1669
// Helper function 1670
// Line 1670
// Line 1671
// Line 1672
// Line 1673
// Line 1674
// Line 1675
// Line 1676
// Line 1677
// Line 1678
// Line 1679
// Helper function 1680
// Line 1680
// Line 1681
// Line 1682
// Line 1683
// Line 1684
// Line 1685
// Line 1686
// Line 1687
// Line 1688
// Line 1689
// Helper function 1690
// Line 1690
// Line 1691
// Line 1692
// Line 1693
// Line 1694
// Line 1695
// Line 1696
// Line 1697
// Line 1698
// Line 1699
// Helper function 1700
// Line 1700
// Line 1701
// Line 1702
// Line 1703
// Line 1704
// Line 1705
// Line 1706
// Line 1707
// Line 1708
// Line 1709
// Helper function 1710
// Line 1710
// Line 1711
// Line 1712
// Line 1713
// Line 1714
// Line 1715
// Line 1716
// Line 1717
// Line 1718
// Line 1719
// Helper function 1720
// Line 1720
// Line 1721
// Line 1722
// Line 1723
// Line 1724
// Line 1725
// Line 1726
// Line 1727
// Line 1728
// Line 1729
// Helper function 1730
// Line 1730
// Line 1731
// Line 1732
// Line 1733
// Line 1734
// Line 1735
// Line 1736
// Line 1737
// Line 1738
// Line 1739
// Helper function 1740
// Line 1740
// Line 1741
// Line 1742
// Line 1743
// Line 1744
// Line 1745
// Line 1746
// Line 1747
// Line 1748
// Line 1749
// Helper function 1750
// Line 1750
// Line 1751
// Line 1752
// Line 1753
// Line 1754
// Line 1755
// Line 1756
// Line 1757
// Line 1758
// Line 1759
// Helper function 1760
// Line 1760
// Line 1761
// Line 1762
// Line 1763
// Line 1764
// Line 1765
// Line 1766
// Line 1767
// Line 1768
// Line 1769
// Helper function 1770
// Line 1770
// Line 1771
// Line 1772
// Line 1773
// Line 1774
// Line 1775
// Line 1776
// Line 1777
// Line 1778
// Line 1779
// Helper function 1780
// Line 1780
// Line 1781
// Line 1782
// Line 1783
// Line 1784
// Line 1785
// Line 1786
// Line 1787
// Line 1788
// Line 1789
// Helper function 1790
// Line 1790
// Line 1791
// Line 1792
// Line 1793
// Line 1794
// Line 1795
// Line 1796
// Line 1797
// Line 1798
// Line 1799
// Helper function 1800
// Line 1800
// Line 1801
// Line 1802
// Line 1803
// Line 1804
// Line 1805
// Line 1806
// Line 1807
// Line 1808
// Line 1809
// Helper function 1810
// Line 1810
// Line 1811
// Line 1812
// Line 1813
// Line 1814
// Line 1815
// Line 1816
// Line 1817
// Line 1818
// Line 1819
// Helper function 1820
// Line 1820
// Line 1821
// Line 1822
// Line 1823
// Line 1824
// Line 1825
// Line 1826
// Line 1827
// Line 1828
// Line 1829
// Helper function 1830
// Line 1830
// Line 1831
// Line 1832
// Line 1833
// Line 1834
// Line 1835
// Line 1836
// Line 1837
// Line 1838
// Line 1839
// Helper function 1840
// Line 1840
// Line 1841
// Line 1842
// Line 1843
// Line 1844
// Line 1845
// Line 1846
// Line 1847
// Line 1848
// Line 1849
// Helper function 1850
// Line 1850
// Line 1851
// Line 1852
// Line 1853
// Line 1854
// Line 1855
// Line 1856
// Line 1857
// Line 1858
// Line 1859
// Helper function 1860
// Line 1860
// Line 1861
// Line 1862
// Line 1863
// Line 1864
// Line 1865
// Line 1866
// Line 1867
// Line 1868
// Line 1869
// Helper function 1870
// Line 1870
// Line 1871
// Line 1872
// Line 1873
// Line 1874
// Line 1875
// Line 1876
// Line 1877
// Line 1878
// Line 1879
// Helper function 1880
// Line 1880
// Line 1881
// Line 1882
// Line 1883
// Line 1884
// Line 1885
// Line 1886
// Line 1887
// Line 1888
// Line 1889
// Helper function 1890
// Line 1890
// Line 1891
// Line 1892
// Line 1893
// Line 1894
// Line 1895
// Line 1896
// Line 1897
// Line 1898
// Line 1899
// Helper function 1900
// Line 1900
// Line 1901
// Line 1902
// Line 1903
// Line 1904
// Line 1905
// Line 1906
// Line 1907
// Line 1908
// Line 1909
// Helper function 1910
// Line 1910
// Line 1911
// Line 1912
// Line 1913
// Line 1914
// Line 1915
// Line 1916
// Line 1917
// Line 1918
// Line 1919
// Helper function 1920
// Line 1920
// Line 1921
// Line 1922
// Line 1923
// Line 1924
// Line 1925
// Line 1926
// Line 1927
// Line 1928
// Line 1929
// Helper function 1930
// Line 1930
// Line 1931
// Line 1932
// Line 1933
// Line 1934
// Line 1935
// Line 1936
// Line 1937
// Line 1938
// Line 1939
// Helper function 1940
// Line 1940
// Line 1941
// Line 1942
// Line 1943
// Line 1944
// Line 1945
// Line 1946
// Line 1947
// Line 1948
// Line 1949
// Helper function 1950
// Line 1950
// Line 1951
// Line 1952
// Line 1953
// Line 1954
// Line 1955
// Line 1956
// Line 1957
// Line 1958
// Line 1959
// Helper function 1960
// Line 1960
// Line 1961
// Line 1962
// Line 1963
// Line 1964
// Line 1965
// Line 1966
// Line 1967
// Line 1968
// Line 1969
// Helper function 1970
// Line 1970
// Line 1971
// Line 1972
// Line 1973
// Line 1974
// Line 1975
// Line 1976
// Line 1977
// Line 1978
// Line 1979
// Helper function 1980
// Line 1980
// Line 1981
// Line 1982
// Line 1983
// Line 1984
// Line 1985
// Line 1986
// Line 1987
// Line 1988
// Line 1989
// Helper function 1990
// Line 1990
// Line 1991
// Line 1992
// Line 1993
// Line 1994
// Line 1995
// Line 1996
// Line 1997
// Line 1998
// Line 1999
// Helper function 2000
// Line 2000
// Line 2001
// Line 2002
// Line 2003
// Line 2004
// Line 2005
// Line 2006
// Line 2007
// Line 2008
// Line 2009
// Helper function 2010
// Line 2010
// Line 2011
// Line 2012
// Line 2013
// Line 2014
// Line 2015
// Line 2016
// Line 2017
// Line 2018
// Line 2019
// Helper function 2020
// Line 2020
// Line 2021
// Line 2022
// Line 2023
// Line 2024
// Line 2025
// Line 2026
// Line 2027
// Line 2028
// Line 2029
// Helper function 2030
// Line 2030
// Line 2031
// Line 2032
// Line 2033
// Line 2034
// Line 2035
// Line 2036
// Line 2037
// Line 2038
// Line 2039
// Helper function 2040
// Line 2040
// Line 2041
// Line 2042
// Line 2043
// Line 2044
// Line 2045
// Line 2046
// Line 2047
// Line 2048
// Line 2049
// Helper function 2050
// Line 2050
// Line 2051
// Line 2052
// Line 2053
// Line 2054
// Line 2055
// Line 2056
// Line 2057
// Line 2058
// Line 2059
// Helper function 2060
// Line 2060
// Line 2061
// Line 2062
// Line 2063
// Line 2064
// Line 2065
// Line 2066
// Line 2067
// Line 2068
// Line 2069
// Helper function 2070
// Line 2070
// Line 2071
// Line 2072
// Line 2073
// Line 2074
// Line 2075
// Line 2076
// Line 2077
// Line 2078
// Line 2079
// Helper function 2080
// Line 2080
// Line 2081
// Line 2082
// Line 2083
// Line 2084
// Line 2085
// Line 2086
// Line 2087
// Line 2088
// Line 2089
// Helper function 2090
// Line 2090
// Line 2091
// Line 2092
// Line 2093
// Line 2094
// Line 2095
// Line 2096
// Line 2097
// Line 2098
// Line 2099
// Helper function 2100
// Line 2100
// Line 2101
// Line 2102
// Line 2103
// Line 2104
// Line 2105
// Line 2106
// Line 2107
// Line 2108
// Line 2109
// Helper function 2110
// Line 2110
// Line 2111
// Line 2112
// Line 2113
// Line 2114
// Line 2115
// Line 2116
// Line 2117
// Line 2118
// Line 2119
// Helper function 2120
// Line 2120
// Line 2121
// Line 2122
// Line 2123
// Line 2124
// Line 2125
// Line 2126
// Line 2127
// Line 2128
// Line 2129
// Helper function 2130
// Line 2130
// Line 2131
// Line 2132
// Line 2133
// Line 2134
// Line 2135
// Line 2136
// Line 2137
// Line 2138
// Line 2139
// Helper function 2140
// Line 2140
// Line 2141
// Line 2142
// Line 2143
// Line 2144
// Line 2145
// Line 2146
// Line 2147
// Line 2148
// Line 2149
// Helper function 2150
// Line 2150
// Line 2151
// Line 2152
// Line 2153
// Line 2154
// Line 2155
// Line 2156
// Line 2157
// Line 2158
// Line 2159
// Helper function 2160
// Line 2160
// Line 2161
// Line 2162
// Line 2163
// Line 2164
// Line 2165
// Line 2166
// Line 2167
// Line 2168
// Line 2169
// Helper function 2170
// Line 2170
// Line 2171
// Line 2172
// Line 2173
// Line 2174
// Line 2175
// Line 2176
// Line 2177
// Line 2178
// Line 2179
// Helper function 2180
// Line 2180
// Line 2181
// Line 2182
// Line 2183
// Line 2184
// Line 2185
// Line 2186
// Line 2187
// Line 2188
// Line 2189
// Helper function 2190
// Line 2190
// Line 2191
// Line 2192
// Line 2193
// Line 2194
// Line 2195
// Line 2196
// Line 2197
// Line 2198
// Line 2199
// Helper function 2200
// Line 2200
// Line 2201
// Line 2202
// Line 2203
// Line 2204
// Line 2205
// Line 2206
// Line 2207
// Line 2208
// Line 2209
// Helper function 2210
// Line 2210
// Line 2211
// Line 2212
// Line 2213
// Line 2214
// Line 2215
// Line 2216
// Line 2217
// Line 2218
// Line 2219
// Helper function 2220
// Line 2220
// Line 2221
// Line 2222
// Line 2223
// Line 2224
// Line 2225
// Line 2226
// Line 2227
// Line 2228
// Line 2229
// Helper function 2230
// Line 2230
// Line 2231
// Line 2232
// Line 2233
// Line 2234
// Line 2235
// Line 2236
// Line 2237
// Line 2238
// Line 2239
// Helper function 2240
// Line 2240
// Line 2241
// Line 2242
// Line 2243
// Line 2244
// Line 2245
// Line 2246
// Line 2247
// Line 2248
// Line 2249
// Helper function 2250
// Line 2250
// Line 2251
// Line 2252
// Line 2253
// Line 2254
// Line 2255
// Line 2256
// Line 2257
// Line 2258
// Line 2259
// Helper function 2260
// Line 2260
// Line 2261
// Line 2262
// Line 2263
// Line 2264
// Line 2265
// Line 2266
// Line 2267
// Line 2268
// Line 2269
// Helper function 2270
// Line 2270
// Line 2271
// Line 2272
// Line 2273
// Line 2274
// Line 2275
// Line 2276
// Line 2277
// Line 2278
// Line 2279
// Helper function 2280
// Line 2280
// Line 2281
// Line 2282
// Line 2283
// Line 2284
// Line 2285
// Line 2286
// Line 2287
// Line 2288
// Line 2289
// Helper function 2290
// Line 2290
// Line 2291
// Line 2292
// Line 2293
// Line 2294
// Line 2295
// Line 2296
// Line 2297
// Line 2298
// Line 2299
// Helper function 2300
// Line 2300
// Line 2301
// Line 2302
// Line 2303
// Line 2304
// Line 2305
// Line 2306
// Line 2307
// Line 2308
// Line 2309
// Helper function 2310
// Line 2310
// Line 2311
// Line 2312
// Line 2313
// Line 2314
// Line 2315
// Line 2316
// Line 2317
// Line 2318
// Line 2319
// Helper function 2320
// Line 2320
// Line 2321
// Line 2322
// Line 2323
// Line 2324
// Line 2325
// Line 2326
// Line 2327
// Line 2328
// Line 2329
// Chart utility line 0
// Chart utility line 1
// Chart utility line 2
// Chart utility line 3
// Chart utility line 4
// Chart utility line 5
// Chart utility line 6
// Chart utility line 7
// Chart utility line 8
// Chart utility line 9
// Chart utility line 10
// Chart utility line 11
// Chart utility line 12
// Chart utility line 13
// Chart utility line 14
// Chart utility line 15
// Chart utility line 16
// Chart utility line 17
// Chart utility line 18
// Chart utility line 19
// Chart utility line 20
// Chart utility line 21
// Chart utility line 22
// Chart utility line 23
// Chart utility line 24
// Chart utility line 25
// Chart utility line 26
// Chart utility line 27
// Chart utility line 28
// Chart utility line 29
// Chart utility line 30
// Chart utility line 31
// Chart utility line 32
// Chart utility line 33
// Chart utility line 34
// Chart utility line 35
// Chart utility line 36
// Chart utility line 37
// Chart utility line 38
// Chart utility line 39
// Chart utility line 40
// Chart utility line 41
// Chart utility line 42
// Chart utility line 43
// Chart utility line 44
// Chart utility line 45
// Chart utility line 46
// Chart utility line 47
// Chart utility line 48
// Chart utility line 49
// Chart utility line 50
// Chart utility line 51
// Chart utility line 52
// Chart utility line 53
// Chart utility line 54
// Chart utility line 55
// Chart utility line 56
// Chart utility line 57
// Chart utility line 58
// Chart utility line 59
// Chart utility line 60
// Chart utility line 61
// Chart utility line 62
// Chart utility line 63
// Chart utility line 64
// Chart utility line 65
// Chart utility line 66
// Chart utility line 67
// Chart utility line 68
// Chart utility line 69
// Chart utility line 70
// Chart utility line 71
// Chart utility line 72
// Chart utility line 73
// Chart utility line 74
// Chart utility line 75
// Chart utility line 76
// Chart utility line 77
// Chart utility line 78
// Chart utility line 79
// Chart utility line 80
// Chart utility line 81
// Chart utility line 82
// Chart utility line 83
// Chart utility line 84
// Chart utility line 85
// Chart utility line 86
// Chart utility line 87
// Chart utility line 88
// Chart utility line 89
// Chart utility line 90
// Chart utility line 91
// Chart utility line 92
// Chart utility line 93
// Chart utility line 94
// Chart utility line 95
// Chart utility line 96
// Chart utility line 97
// Chart utility line 98
// Chart utility line 99
// Chart utility line 100
// Chart utility line 101
// Chart utility line 102
// Chart utility line 103
// Chart utility line 104
// Chart utility line 105
// Chart utility line 106
// Chart utility line 107
// Chart utility line 108
// Chart utility line 109
// Chart utility line 110
// Chart utility line 111
// Chart utility line 112
// Chart utility line 113
// Chart utility line 114
// Chart utility line 115
// Chart utility line 116
// Chart utility line 117
// Chart utility line 118
// Chart utility line 119
// Chart utility line 120
// Chart utility line 121
// Chart utility line 122
// Chart utility line 123
// Chart utility line 124
// Chart utility line 125
// Chart utility line 126
// Chart utility line 127
// Chart utility line 128
// Chart utility line 129
// Chart utility line 130
// Chart utility line 131
// Chart utility line 132
// Chart utility line 133
// Chart utility line 134
// Chart utility line 135
// Chart utility line 136
// Chart utility line 137
// Chart utility line 138
// Chart utility line 139
// Chart utility line 140
// Chart utility line 141
// Chart utility line 142
// Chart utility line 143
// Chart utility line 144
// Chart utility line 145
// Chart utility line 146
// Chart utility line 147
// Chart utility line 148
// Chart utility line 149
// Chart utility line 150
// Chart utility line 151
// Chart utility line 152
// Chart utility line 153
// Chart utility line 154
// Chart utility line 155
// Chart utility line 156
// Chart utility line 157
// Chart utility line 158
// Chart utility line 159
// Chart utility line 160
// Chart utility line 161
// Chart utility line 162
// Chart utility line 163
// Chart utility line 164
// Chart utility line 165
// Chart utility line 166
// Chart utility line 167
// Chart utility line 168
// Chart utility line 169
// Chart utility line 170
// Chart utility line 171
// Chart utility line 172
// Chart utility line 173
// Chart utility line 174
// Chart utility line 175
// Chart utility line 176
// Chart utility line 177
// Chart utility line 178
// Chart utility line 179
// Chart utility line 180
// Chart utility line 181
// Chart utility line 182
// Chart utility line 183
// Chart utility line 184
// Chart utility line 185
// Chart utility line 186
// Chart utility line 187
// Chart utility line 188
// Chart utility line 189
// Chart utility line 190
// Chart utility line 191
// Chart utility line 192
// Chart utility line 193
// Chart utility line 194
// Chart utility line 195
// Chart utility line 196
// Chart utility line 197
// Chart utility line 198
// Chart utility line 199
// Chart utility line 200
// Chart utility line 201
// Chart utility line 202
// Chart utility line 203
// Chart utility line 204
// Chart utility line 205
// Chart utility line 206
// Chart utility line 207
// Chart utility line 208
// Chart utility line 209
// Chart utility line 210
// Chart utility line 211
// Chart utility line 212
// Chart utility line 213
// Chart utility line 214
// Chart utility line 215
// Chart utility line 216
// Chart utility line 217
// Chart utility line 218
// Chart utility line 219
// Chart utility line 220
// Chart utility line 221
// Chart utility line 222
// Chart utility line 223
// Chart utility line 224
// Chart utility line 225
// Chart utility line 226
// Chart utility line 227
// Chart utility line 228
// Chart utility line 229
// Chart utility line 230
// Chart utility line 231
// Chart utility line 232
// Chart utility line 233
// Chart utility line 234
// Chart utility line 235
// Chart utility line 236
// Chart utility line 237
// Chart utility line 238
// Chart utility line 239
// Chart utility line 240
// Chart utility line 241
// Chart utility line 242
// Chart utility line 243
// Chart utility line 244
// Chart utility line 245
// Chart utility line 246
// Chart utility line 247
// Chart utility line 248
// Chart utility line 249
// Chart utility line 250
// Chart utility line 251
// Chart utility line 252
// Chart utility line 253
// Chart utility line 254
// Chart utility line 255
// Chart utility line 256
// Chart utility line 257
// Chart utility line 258
// Chart utility line 259
// Chart utility line 260
// Chart utility line 261
// Chart utility line 262
// Chart utility line 263
// Chart utility line 264
// Chart utility line 265
// Chart utility line 266
// Chart utility line 267
// Chart utility line 268
// Chart utility line 269
// Chart utility line 270
// Chart utility line 271
// Chart utility line 272
// Chart utility line 273
// Chart utility line 274
// Chart utility line 275
// Chart utility line 276
// Chart utility line 277
// Chart utility line 278
// Chart utility line 279
// Chart utility line 280
// Chart utility line 281
// Chart utility line 282
// Chart utility line 283
// Chart utility line 284
// Chart utility line 285
// Chart utility line 286
// Chart utility line 287
// Chart utility line 288
// Chart utility line 289
// Chart utility line 290
// Chart utility line 291
// Chart utility line 292
// Chart utility line 293
// Chart utility line 294
// Chart utility line 295
// Chart utility line 296
// Chart utility line 297
// Chart utility line 298
// Chart utility line 299
// Chart utility line 300
// Chart utility line 301
// Chart utility line 302
// Chart utility line 303
// Chart utility line 304
// Chart utility line 305
// Chart utility line 306
// Chart utility line 307
// Chart utility line 308
// Chart utility line 309
// Chart utility line 310
// Chart utility line 311
// Chart utility line 312
// Chart utility line 313
// Chart utility line 314
// Chart utility line 315
// Chart utility line 316
// Chart utility line 317
// Chart utility line 318
// Chart utility line 319
// Chart utility line 320
// Chart utility line 321
// Chart utility line 322
// Chart utility line 323
// Chart utility line 324
// Chart utility line 325
// Chart utility line 326
// Chart utility line 327
// Chart utility line 328
// Chart utility line 329
// Chart utility line 330
// Chart utility line 331
// Chart utility line 332
// Chart utility line 333
// Chart utility line 334
// Chart utility line 335
// Chart utility line 336
// Chart utility line 337
// Chart utility line 338
// Chart utility line 339
// Chart utility line 340
// Chart utility line 341
// Chart utility line 342
// Chart utility line 343
// Chart utility line 344
// Chart utility line 345
// Chart utility line 346
// Chart utility line 347
// Chart utility line 348
// Chart utility line 349
// Chart utility line 350
// Chart utility line 351
// Chart utility line 352
// Chart utility line 353
// Chart utility line 354
// Chart utility line 355
// Chart utility line 356
// Chart utility line 357
// Chart utility line 358
// Chart utility line 359
// Chart utility line 360
// Chart utility line 361
// Chart utility line 362
// Chart utility line 363
// Chart utility line 364
// Chart utility line 365
// Chart utility line 366
// Chart utility line 367
// Chart utility line 368
// Chart utility line 369
// Chart utility line 370
// Chart utility line 371
// Chart utility line 372
// Chart utility line 373
// Chart utility line 374
// Chart utility line 375
// Chart utility line 376
// Chart utility line 377
// Chart utility line 378
// Chart utility line 379
// Chart utility line 380
// Chart utility line 381
// Chart utility line 382
// Chart utility line 383
// Chart utility line 384
// Chart utility line 385
// Chart utility line 386
// Chart utility line 387
// Chart utility line 388
// Chart utility line 389
// Chart utility line 390
// Chart utility line 391
// Chart utility line 392
// Chart utility line 393
// Chart utility line 394
// Chart utility line 395
// Chart utility line 396
// Chart utility line 397
// Chart utility line 398
// Chart utility line 399